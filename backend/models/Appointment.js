const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  customerName: {
    type: String,
    trim: true,
    default: 'Walk-in',
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'services',
    required: true,
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'staffs',
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: String, // format: 'YYYY-MM-DD'
    required: true,
  },
  time: {
    type: String, // format: 'HH:mm' (e.g. '14:30')
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'completed', 'cancelled'],
    default: 'booked',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users', // admin who created the booking
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookingModel = mongoose.model('bookings', bookingSchema);
module.exports = BookingModel;
