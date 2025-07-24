const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  customerName: String,
  service: { type: Schema.Types.ObjectId, ref: 'services', required: true },
  staff: { type: Schema.Types.ObjectId, ref: 'staffs' },
  date: { type: Date, required: true },
  time: { type: String },
  status: {
    type: String,
    enum: ['pending', 'booked', 'completed', 'cancelled'], // optional
    default: 'pending'
  },

  price: { type: Number }
}, { timestamps: true });


const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;