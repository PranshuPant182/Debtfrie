const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/submit-form", async (req, res) => {
  const { formData, paymentInfo } = req.body;

  // SMTP config for GoDaddy
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to user
  const userMailOptions = {
    from: "Official@debtfrie.in",
    to: formData.email,
    subject: "Welcome to Debtfrie – Your Journey Towards Financial Freedom Begins Here",
    text: `Dear ${formData.fullName},

Thank you for getting in touch with us, and welcome to Debtfrie.

We truly appreciate your decision to take a step toward resolving your debt concerns. At Debtfrie, we understand that financial challenges can be stressful — and we’re here to support you every step of the way with compassion, expertise, and complete confidentiality.

About Us
Debtfrie is India’s leading debt resolution firm, dedicated to helping individuals legally and ethically resolve their debt — such as credit cards, personal loans, business loans, and overdue EMIs.

Please note: We do not give loans.
Our focus is on helping you settle and manage existing debt through structured, compliant solutions.

What Happens Next?
One of our experienced debt resolution experts will be reaching out to you shortly to understand your situation and guide you through the available options tailored to your needs.

Kindly keep your updated credit report ready so we can accurately evaluate your current loans and obligations during our consultation.

We’re honoured to be part of your journey towards a more stable and stress-free financial future.

Hum Aapke Saath Hain.

Warm regards,  
Team Debtfrie  
India’s Trusted Debt Resolution Experts  
www.debtfrie.in`
  };

  // Email to self (internal notification)
  const internalMailOptions = {
    from: "no-reply@debtfrie.in",
    to: "Official@debtfrie.in", // your own inbox
    subject: `New Form Submission from ${formData.fullName}`,
    text: `You have received a new form submission:

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
    `
  };

  try {
    await transporter.sendMail(userMailOptions);       // Send to user
    await transporter.sendMail(internalMailOptions);   // Send to your own inbox
    res.json({ success: true });
  } catch (error) {
    console.log("Email sending error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
