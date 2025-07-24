const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    amount: Number,
    paymentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PaymentModel', paymentSchema);
