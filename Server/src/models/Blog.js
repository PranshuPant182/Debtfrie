const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // paragraph, heading, list, steps
  title: String,
  text: String,
  items: [String],
  subitems: [{
    subheading: String,
    points: [String]
  }]
});

const BlogSchema = new mongoose.Schema({
  author: { type: String, required: true },
  disclaimer: String,
  title: { type: String, required: true },
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', BlogSchema);
