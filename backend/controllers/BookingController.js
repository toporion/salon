const BookingModel = require("../models/BookingModel");

const createBooking = async (req, res) => {
    try{
        const {service,date,timeSlot} = req.body;
        const userId = req.user._id; // Assuming user ID is stored in req.user

        // basic validation
        if (!service || !date || !timeSlot || !totalPrice) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // convert and validate date
        const selectedDate = new Date(date);
        if(isNaN(selectedDate)){
            return res.status(400).json({ error: "Invalid date format" });
        }

        // check booking conflicts
        const existingBooking = await BookingModel.findOne({
            user: userId,
            service,
            date: selectedDate,
            timeSlot,
            status: { $ne: 'cancelled' } // Exclude cancelled bookings
        });
        if (existingBooking) {
            return res.status(400).json({ error: "You already have a booking for this service at this time" });
        }
        // fetch service price
        const serviceDetails = await BookingModel.findById(service);
        if (!serviceDetails) {
            return res.status(404).json({ error: "Service not found" });
        }
        const totalPrice = serviceDetails.price; // Use service price as total price

        // validate total price
        if (totalPrice !== serviceDetails.price) {
            return res.status(400).json({ error: "Total price does not match service price" });
        }
        

        // create new booking
        const newBooking = new BookingModel({
            user: userId,
            service,
            date: selectedDate,
            timeSlot,
            totalPrice,
            status: 'pending' // Default status
        });

    }catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = {
    createBooking


    
}