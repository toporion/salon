const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 1,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enum: ['Hair', 'Face', 'Body', 'Nails', 'Other'],
    default: 'Hair',
  },
  image: {
    type: String, // Cloudinary URL or direct upload
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users', // assuming your user model is 'users'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const ServiceModel = mongoose.model('services', serviceSchema);
module.exports = ServiceModel;
