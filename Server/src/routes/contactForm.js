const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const router = express.Router();
const axios = require("axios");

const ODOO_CONFIG = {
  url: "https://debtfrie1.odoo.com/jsonrpc",
  db: "debtfrie1",
  uid: 2,
  password: "97fa39c7320d0fe2251bc1c80539d8e45a8e9a1a"
};

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
    type: mongoose.Schema.Types.Mixed, // Stores any object structure
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
  },
  odooLeadCreated: {
    type: Boolean,
    default: false
  },
  odooLeadId: {
    type: String,
    default: null
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});


async function createOdooLead(formData, submissionId) {

  const leadData = {
    name: formData.fullName,
    contact_name: formData.fullName,
    email_from: formData.email,
    phone: formData.phone,
    city: formData.city,
    x_Monthly_Income: formData.monthlyIncome,
    x_outstanding_creditCards_due: formData.creditCardDues,
    x_outstanding_personal_loan_dues: formData.loanDues,
    x_emi_bounce_status: formData.emiBounce,
    description: formData.additionalInfo,
    type: "lead"
  };

  const requestPayload = {
    jsonrpc: "2.0",
    method: "call",
    id: Date.now(),
    params: {
      service: "object",
      method: "execute_kw",
      args: [
        ODOO_CONFIG.db,
        ODOO_CONFIG.uid,
        ODOO_CONFIG.password,
        "crm.lead",
        "create",
        [[leadData]]
      ]
    }
  };

  try {
    const response = await axios.post(ODOO_CONFIG.url, requestPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000 // 30 second timeout
    });

    if (response.data.error) {
      console.error('Odoo API returned an error:', response.data.error);
      throw new Error(`Odoo API Error: ${JSON.stringify(response.data.error)}`);
    }

    if (!response.data.result) {
      console.error('No result in Odoo response');
      throw new Error('Odoo API returned no result');
    }

    const leadId = Array.isArray(response.data.result) ? response.data.result[0] : response.data.result;
    return leadId;

  } catch (axiosError) {
    throw axiosError; // Re-throw to be handled by calling function
  }
}


const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);

router.post("/submit-form", async (req, res) => {
  const { formData, paymentInfo } = req.body;

  try {
    // Save form data to database FIRST
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

    // SMTP config for GoDaddy
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      port: 465,
      secure: true,
      auth: {
        user: "Official@debtfrie.in",
        pass: "Debtfrie@9971",
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

Reference ID: ${savedSubmission._id}`
    };

    // Email to self (internal notification)
    const internalMailOptions = {
      from: "no-reply@debtfrie.in",
      to: "Official@debtfrie.in",
      subject: `New Form Submission from ${formData.fullName} - ID: ${savedSubmission._id}`,
      text: `You have received a new form submission:

Reference ID: ${savedSubmission._id}
Submission Date: ${savedSubmission.submissionDate}

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

    // // Send emails
    // await transporter.sendMail(userMailOptions);
    // await transporter.sendMail(internalMailOptions);

    // // Update the database to mark email as sent
    // await FormSubmission.findByIdAndUpdate(savedSubmission._id, { emailSent: true });

    // // Check for successful Razorpay payment
    // const isPaymentSuccessful = paymentInfo &&
    //   paymentInfo.razorpay_payment_id &&
    //   paymentInfo.razorpay_order_id &&
    //   paymentInfo.razorpay_signature;

    // if (isPaymentSuccessful) {
    //   try {
    //     const odooLeadId = await createOdooLead(formData, savedSubmission._id);

    //   } catch (odooError) {
    //     console.log("err", odooError)

    //     // Update database to record the error
    //     try {
    //       await FormSubmission.findByIdAndUpdate(savedSubmission._id, {
    //         notes: `Odoo lead creation failed at ${new Date().toISOString()}: ${odooError.message}`,
    //         odooLeadCreated: false
    //       });
    //     } catch (dbError) {
    //       console.error('❌ Failed to update database with error info:', dbError.message);
    //     }
    //   }
    // } else {
    //   console.log('⏭️ SKIPPING ODOO LEAD CREATION');

    //   if (!paymentInfo) {
    //     console.log('⚠️ No payment info provided');
    //   } else if (paymentInfo.status !== 'success') {
    //     console.log('💳 Actual payment status:', paymentInfo.status);
    //   }
    // }
    // ------------------- SEND EMAILS (but don't stop execution if failed) -------------------
    try {
      await transporter.sendMail(userMailOptions);
      await transporter.sendMail(internalMailOptions);

      // Email sent successfully
      await FormSubmission.findByIdAndUpdate(savedSubmission._id, { emailSent: true });
    } catch (emailError) {
      console.error("⚠ Email sending failed but continuing...", emailError.message);

      // Log failure but do NOT stop the process
      await FormSubmission.findByIdAndUpdate(savedSubmission._id, {
        emailSent: false,
        notes: `Email failed at ${new Date().toISOString()}: ${emailError.message}`
      });
    }

    // ------------------- ODOO LEAD CREATION (runs even if email failed) -------------------
    const isPaymentSuccessful =
      paymentInfo &&
      paymentInfo.razorpay_payment_id &&
      paymentInfo.razorpay_order_id &&
      paymentInfo.razorpay_signature;

    if (isPaymentSuccessful) {
      try {
        const odooLeadId = await createOdooLead(formData, savedSubmission._id);

        // Update record with successful Odoo lead ID
        await FormSubmission.findByIdAndUpdate(savedSubmission._id, {
          odooLeadCreated: true,
          odooLeadId
        });
      } catch (odooError) {
        console.log("err", odooError);

        // Even if Odoo fails — save error safely
        await FormSubmission.findByIdAndUpdate(savedSubmission._id, {
          notes: `Odoo lead creation failed at ${new Date().toISOString()}: ${odooError.message}`,
          odooLeadCreated: false
        });
      }
    } else {
      console.log('SKIPPING ODOO LEAD CREATION');

      if (!paymentInfo) {
        console.log('No payment info provided');
      } else if (paymentInfo.status !== 'success') {
        console.log('Actual payment status:', paymentInfo.status);
      }
    }


    res.json({
      success: true,
      submissionId: savedSubmission._id,
      message: "Form submitted successfully and confirmation email sent."
    });

  } catch (error) {
    console.log("Error in form submission:", error);

    // Check if DB saved the submission
    if (savedSubmission && savedSubmission._id) {
      // FORM SUCCESS — RETURN SUCCESS RESPONSE
      return res.json({
        success: true,
        submissionId: savedSubmission._id,
        message: "Form submitted successfully. Email sending may have failed."
      });
    }

    // If form was NOT saved — return real error
    return res.status(500).json({
      success: false,
      error: "Form submission failed",
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

// DELETE API to delete a submission by ID
router.delete("/submissions/:id", async (req, res) => {
  try {
    const submissionId = req.params.id;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid submission ID format"
      });
    }

    // Find and delete the submission
    const deletedSubmission = await FormSubmission.findByIdAndDelete(submissionId);

    if (!deletedSubmission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found"
      });
    }
    res.json({
      success: true,
      message: "Submission deleted successfully",
      deletedSubmission: {
        id: deletedSubmission._id,
        fullName: deletedSubmission.fullName,
        email: deletedSubmission.email
      }
    });

  } catch (error) {
    console.log("Error deleting submission:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while deleting submission",
      details: error.message
    });
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

    res.json({
      success: true,
      data: {
        totalSubmissions,
        todaySubmissions,
        statusBreakdown: stats
      }
    });

  } catch (error) {
    console.log("Error fetching dashboard stats:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;