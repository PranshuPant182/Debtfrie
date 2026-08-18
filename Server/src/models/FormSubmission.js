const mongoose = require('mongoose');

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
    default: ""
  },
  monthlyIncome: {
    type: String,
    default: ""
  },
  creditCardDues: {
    type: String,
    default: ""
  },
  loanDues: {
    type: String,
    default: ""
  },
  emiBounce: {
    type: String,
    default: ""
  },
  additionalInfo: {
    type: String,
    default: ""
  },
  paymentInfo: {
    type: mongoose.Schema.Types.Mixed, // Stores any object structure (null for free leads)
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

module.exports = mongoose.model('FormSubmission', FormSubmissionSchema);
