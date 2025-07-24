const { default: mongoose } = require("mongoose");
const StaffModel = require("../models/StaffModel");
const bcrypt = require("bcryptjs");

const addStaff = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const { contact, password } = req.body;

    // Check base validation
    if (!req.body.name || !req.body.role || !contact) {
      return res.status(400).json({
        success: false,
        message: 'Name, role, and contact are required.',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or missing creator (authentication failed).',
      });
    }

    // Check duplicate
    const exists = await StaffModel.findOne({ contact, createdBy });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'Staff with this contact already exists under your account.',
      });
    }

    // Convert services to array if it's a string (FormData issue)
    let services = req.body.services;
    if (typeof services === 'string') {
      services = [services];
    }
    // Hash the password correctly
    const hashPassword = await bcrypt.hash(String(password), 10);

    // Final staff data using spread
    const staffData = {
      ...req.body,
      services,
      image: req.file?.path || null,
      createdBy,
      password: hashPassword,
    };

    const newStaff = new StaffModel(staffData);
    await newStaff.save();

    
    res.status(200).json({
      success: true,
      message: 'Staff successfully created',
      data: newStaff,
    });
  } catch (error) {
    console.error("addStaff error:", JSON.stringify(error, null, 2));

    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getStaffData = async (req, res) => {
  try {

    const staffData = await StaffModel.find({}).populate('services', 'name').populate('createdBy', 'name');
    res.status(200).json({ success: true, message: "successfully get all staffs", data: staffData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

const updateStaffData = async (req, res) => {
  try {
    const staffId = req.params.id;
    const createdBy = req.user._id;
    const { name, role, contact } = req.body;

    // Basic validation
    if (!name || !role || !contact) {
      return res.status(400).json({
        success: false,
        message: 'Name, role, and contact are required.',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or missing creator.',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid staff ID.',
      });
    }

    // Normalize services
    let services = req.body.services;
    if (typeof services === 'string') {
      services = [services];
    }

    const updatedFields = {
      ...req.body,
      services,
      createdBy,
    };

    // Only replace image if new one is uploaded
    if (req.file?.path) {
      updatedFields.image = req.file.path;
    }

    const updatedStaff = await StaffModel.findOneAndUpdate(
      { _id: staffId, createdBy },
      updatedFields,
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({
        success: false,
        message: 'Staff not found or you are not authorized.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Staff updated successfully',
      data: updatedStaff,
    });
  } catch (error) {
    console.error('updateStaffData error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getSingleStaff = async (req, res) => {
  try {
    const staff = await StaffModel.findById(req.params.id).populate('services');
    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }
    res.status(200).json({ success: true, data: staff });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
};




module.exports = { addStaff, getStaffData, updateStaffData, getSingleStaff };