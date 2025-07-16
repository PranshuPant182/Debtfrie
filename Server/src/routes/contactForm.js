const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const router = express.Router();

// Form submission schema
const FormSubmissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  monthlyIncome: {
    type: String,
    required: true
  },
  creditCardDues: {
    type: String,
    required: true
  },
  loanDues: {
    type: String,
    required: true
  },
  emiBounce: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String,
    default: ""
  },
  paymentInfo: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  submissionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);

// MODIFIED: Only save form AFTER payment verification
router.post("/submit-form", async (req, res) => {
  const { formData, paymentInfo } = req.body;

  try {
    // STEP 1: Verify payment first
    if (!paymentInfo || !paymentInfo.paymentId || !paymentInfo.status) {
      return res.status(400).json({ 
        success: false, 
        error: "Payment information is required" 
      });
    }

    // STEP 2: Check if payment is successful
    if (paymentInfo.status !== 'captured' && paymentInfo.status !== 'success') {
      return res.status(400).json({ 
        success: false, 
        error: "Payment not successful. Form cannot be submitted." 
      });
    }

    // STEP 3: Check if this payment ID was already used
    const existingSubmission = await FormSubmission.findOne({ 
      'paymentInfo.paymentId': paymentInfo.paymentId 
    });

    if (existingSubmission) {
      return res.status(400).json({ 
        success: false, 
        error: "This payment has already been used for a submission." 
      });
    }

    // STEP 4: ONLY NOW save form data to database (after payment verification)
    const newSubmission = new FormSubmission({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      monthlyIncome: formData.monthlyIncome,
      creditCardDues: formData.creditCardDues,
      loanDues: formData.loanDues,
      emiBounce: formData.emiBounce,
      additionalInfo: formData.additionalInfo,
      paymentInfo: paymentInfo
    });

    const savedSubmission = await newSubmission.save();
    console.log("✅ PAID Form data saved to database with ID:", savedSubmission._id);

    // STEP 5: Send emails (only after successful payment + form save)
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: "Official@debtfrie.in",
        pass: "Debtfrie#9266",
      },
    });

    // Email to user
    const userMailOptions = {
      from: "Official@debtfrie.in",
      to: formData.email,
      subject: "Welcome to Debtfrie – Your Journey Towards Financial Freedom Begins Here",
      text: `Dear ${formData.fullName},

Thank you for getting in touch with us, and welcome to Debtfrie.

We truly appreciate your decision to take a step toward resolving your debt concerns. At Debtfrie, we understand that financial challenges can be stressful — and we're here to support you every step of the way with compassion, expertise, and complete confidentiality.

About Us
Debtfrie is India's leading debt resolution firm, dedicated to helping individuals legally and ethically resolve their debt — such as credit cards, personal loans, business loans, and overdue EMIs.

Please note: We do not give loans.
Our focus is on helping you settle and manage existing debt through structured, compliant solutions.

What Happens Next?
One of our experienced debt resolution experts will be reaching out to you shortly to understand your situation and guide you through the available options tailored to your needs.

Kindly keep your updated credit report ready so we can accurately evaluate your current loans and obligations during our consultation.

We're honoured to be part of your journey towards a more stable and stress-free financial future.

Hum Aapke Saath Hain.

Warm regards,  
Team Debtfrie  
India's Trusted Debt Resolution Experts  
www.debtfrie.in

    };

    // Email to self (internal notification)
    const internalMailOptions = {
      from: "no-reply@debtfrie.in",
      to: "Official@debtfrie.in",
      subject: `💰 PAID Form Submission from ${formData.fullName} - ID: ${savedSubmission._id}`,
      text: `You have received a new PAID form submission:

✅ PAYMENT VERIFIED ✅
Payment ID: ${paymentInfo.paymentId}
Order ID: ${paymentInfo.orderId || 'N/A'}
Amount: ₹${paymentInfo.amount ? (paymentInfo.amount/100) : 'N/A'}
Status: ${paymentInfo.status}

Reference ID: ${savedSubmission._id}
Submission Date: ${savedSubmission.submissionDate}

CUSTOMER DETAILS:
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}
Monthly Income: ${formData.monthlyIncome}
Credit Card Dues: ${formData.creditCardDues}
Personal Loan Dues: ${formData.loanDues}
EMI Bounce: ${formData.emiBounce}
Additional Info: ${formData.additionalInfo || "N/A"}

Payment Info: ${JSON.stringify(paymentInfo, null, 2)}

View in portal: [Your portal URL]/submissions/${savedSubmission._id}
      `
    };

    // Send emails
    await transporter.sendMail(userMailOptions);
    console.log("✅ User email sent successfully");
    
    await transporter.sendMail(internalMailOptions);
    console.log("✅ Internal email sent successfully");

    // Update the database to mark email as sent
    await FormSubmission.findByIdAndUpdate(savedSubmission._id, { emailSent: true });

    res.json({ 
      success: true, 
      submissionId: savedSubmission._id,
      paymentId: paymentInfo.paymentId,
      message: "✅ Payment verified! Form submitted successfully and confirmation email sent."
    });

  } catch (error) {
    console.log("❌ Error in form submission:", error);
    
    res.status(500).json({ 
      success: false, 
      error: "Form submission failed. Please contact support if payment was deducted.",
      details: error.message 
    });
  }
});

// GET API to fetch all submissions for portal
router.get("/submissions", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;

    // Build query
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const submissions = await FormSubmission.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await FormSubmission.countDocuments(query);

    res.json({
      success: true,
      data: submissions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total: total
    });

  } catch (error) {
    console.log("Error fetching submissions:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET API to fetch single submission by ID
router.get("/submissions/:id", async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({ success: false, error: "Submission not found" });
    }

    res.json({ success: true, data: submission });

  } catch (error) {
    console.log("Error fetching submission:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT API to update submission status or add notes
router.put("/submissions/:id", async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;

    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ success: false, error: "Submission not found" });
    }

    res.json({ success: true, data: submission });

  } catch (error) {
    console.log("Error updating submission:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET API for dashboard statistics
router.get("/dashboard/stats", async (req, res) => {
  try {
    const stats = await FormSubmission.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalSubmissions = await FormSubmission.countDocuments();
    const todaySubmissions = await FormSubmission.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    });

    // Calculate total revenue (all submissions have successful payments)
    const revenueStats = await FormSubmission.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$paymentInfo.amount" },
          averageAmount: { $avg: "$paymentInfo.amount" }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalSubmissions,
        todaySubmissions,
        statusBreakdown: stats,
        totalRevenue: revenueStats[0]?.totalRevenue ? (revenueStats[0].totalRevenue / 100) : 0,
        averageAmount: revenueStats[0]?.averageAmount ? (revenueStats[0].averageAmount / 100) : 0
      }
    });

  } catch (error) {
    console.log("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
