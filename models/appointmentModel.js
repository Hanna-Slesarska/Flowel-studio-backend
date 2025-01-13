const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appointmentId: String, // Acuity's appointment ID
    dateTime: Date,
    details: Object, // Store other relevant appointment details here
  });
  module.exports = mongoose.model('Appointment', appointmentSchema);