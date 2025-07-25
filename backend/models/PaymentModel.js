// models/PaymentModel.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking', // Assuming it references your Booking model
    required: true,
    // *** ADD THIS LINE ***
    unique: true // Ensures only one payment can exist per bookingId
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // assuming you have a User model
    required: true,
  },
  email: String,
  serviceName: String,
  amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const PaymentModel = mongoose.model('Payment', paymentSchema)
module.exports = PaymentModel;
