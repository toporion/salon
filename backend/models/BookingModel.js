const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'services', required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalPrice: { type: Number, required: true, default: 0 },
}
    , { timestamps: true });

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;