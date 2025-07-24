const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const profilePicture = req.file ? req.file.path : null; // Assuming file upload middleware is used
        const hashPassword = await bcrypt.hash(String(password), 10);
        const newUser = new UserModel({
            ...req.body,
            password: hashPassword,
            profilePicture
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", data: newUser });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(String(password), user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const jwtToken = jwt.sign(
            { _id: user._id, role: user.role , email: user.email, image: user.profilePicture,name: user.name},
            process.env.JWT_SECRET,
            { expiresIn: '1h' });

            res.status(200).json({
                success:true,
                message: "Login successful",
                jwtToken,
                user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.profilePicture
                }
            })
            
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUserById = async (req, res) => {
    try{
        const {id}= req.params;
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const userDetails=await UserModel.findById(id)
        res.status(200).json({ success: true, data: userDetails });

    }catch(error){
        console.error("Error in getUserById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully" });
    }catch(error){
        console.error("Error in deleteUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

const getUserByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) return res.status(400).json({ success: false, message: "Email is required" });

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        res.status(200).json({
            success: true,
            user: {
                email: user.email,
                image: user.profilePicture,
                name: user.name,
            },
        });
    } catch (error) {
        console.log("Error fetching user by email", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const makeRole=async(req,res)=>{
    try{
        const {id}=req.params;
        const {role}=req.body;
        const newRole=await UserModel.findOneAndUpdate(
            {_id:id},
            {role:role},
            {new:true}
        )
        res.status(200).json({success:true,message:"successfully changed role",data:newRole})
    }catch(error){
         console.log("Error fetching user by email", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
module.exports = { registerUser, loginUser, getAllUsers, getUserById, deleteUser, getUserByEmail,makeRole };