const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the reviewer
  review: { type: String, required: true }, // Testimonial text
  image: { type: String, default: null }, // Optional profile picture URL
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('Review', reviewSchema);