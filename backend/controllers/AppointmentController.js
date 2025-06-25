const BookingModel = require("../models/Appointment");

const createAppointment = async (req, res) => {
    try {
        const { staff, date, time, } = req.body;
        const createdBy = req.user._id;
        const exisitBooking = await BookingModel.findOne({ staff, date, time })
        if (exisitBooking) {
            return res.status(400).json({
                success: false,
                message: "This staff already has a booking at that time.",
            });
        }
        const newAppointment = new BookingModel({
            ...req.body,
            createdBy
        })
        await newAppointment.save()
        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: newAppointment,
        });
    } catch (error) {
        console.log('Appointment error', error)
        res.status(500).json({ success: false, message: "internal server error" })
    }
}

module.exports={createAppointment}