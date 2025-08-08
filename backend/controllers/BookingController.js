const BookingModel = require("../models/BookingModel");

const createBooking = async (req, res) => {
    try {
        const { customerName, service, staff, date, time, price } = req.body;
        console.log("Decoded user from token:", req.user);
        const userId = req.user._id;

        if (!customerName || !service || !date || !price) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingBooking = await BookingModel.findOne({
            createdBy: userId, staff, date, time
        });
        if (existingBooking) {
            return res.status(400).json({ error: "You already have a booking at this time" });
        }
        const newBooking = new BookingModel({
            createdBy: userId,
            customerName,
            service,
            staff,
            date,
            time,
            status: "pending",
            price: service.price // Assuming service has a price field
        });
        // Override again as double protection
        newBooking.status = 'pending';
        await newBooking.save();
        console.log("Booking created successfully:", newBooking);
        res.status(201).json({
            success: true,
            data: newBooking
        });

    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const getBooking = async (req, res) => {
    try {
        console.log("Decoded user from token:", req.user);

        const userId = req.user._id;
        const bookings = await BookingModel.find({ createdBy: userId }).populate('service');

        console.log("User bookings:", bookings);
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ error: "No bookings found for this user" });
        }
        const totalPrice = bookings.reduce((sum, booking) => {
            return sum + (booking.price || 0);
        }, 0);

        res.status(200).json({
            success: true,
            data: { bookings, totalPrice },
            totalPrice: totalPrice
        });
        console.log("Bookings fetched successfully:", bookings, totalPrice);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// GET /get-booking-by-id/:id
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await BookingModel.findById(id).populate('service');

        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }

        res.status(200).json({
            success: true,
            data: booking // ← 🛑 This is the issue
        });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const getBookingsByStaff = async (req, res) => {
    try {
        const { staffId } = req.params;
        const { status } = req.query; // optional status query (e.g., paid)

        const query = { staff: staffId };
        if (status) {
            query.status = status;
        }

        const bookings = await BookingModel.find(query)
            .populate('service')  // populate service to get service name
            .sort({ date: -1 });

        const totalIncome = bookings.reduce((sum, booking) => sum + (booking.price || 0), 0);

        res.status(200).json({
            success: true,
            data: bookings,
            totalIncome
        });
    } catch (error) {
        console.error("Error fetching bookings by staff:", error);
        res.status(500).json({ error: "Server error" });
    }
};




module.exports = { createBooking, getBooking, getBookingById,getBookingsByStaff };