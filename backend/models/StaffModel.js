const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role: {
        type: String,
        required: true,
        enum: ['stylist', 'colorist', 'receptionist', 'assistant', 'manager', 'other'],
        lowercase: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    profilePicture:{type:String},
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'services' // Adjust if your service model is named differently
    }],
   
    active: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users', // Adjust if your user/admin model has a different name
        required: true
    }
}, { timestamps: true });

const StaffModel = mongoose.model('staffs', staffSchema);
module.exports = StaffModel;
