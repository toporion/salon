const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema=new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, default:'user', enum:['user', 'admin']},
    profilePicture:{type:String}
},{timestamps:true});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;