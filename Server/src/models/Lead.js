const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      default: '',
    },
    monthlyIncome: {
      type: String,
      default: '',
    },
    creditCardDues: {
      type: String,
      default: '',
    },
    loanDues: {
      type: String,
      default: '',
    },
    emiBounce: {
      type: String,
      default: '',
    },
    additionalInfo: {
      type: String,
      default: '',
    },
    utmParams: {
      landing_page: { type: String, default: '' },
      utm_source: { type: String, default: '' },
      utm_medium: { type: String, default: '' },
      utm_campaign: { type: String, default: '' },
      utm_term: { type: String, default: '' },
      utm_content: { type: String, default: '' },
      utm_keyword: { type: String, default: '' },
      utm_adgroup: { type: String, default: '' },
      utm_adset: { type: String, default: '' },
      utm_campaign_id: { type: String, default: '' },
      utm_ad_id: { type: String, default: '' },
      utm_device: { type: String, default: '' },
    },
    odooStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    odooLeadId: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    odooError: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Lead', LeadSchema);
