const { createBooking, getBooking, getBookingById, getBookingsByStaff} = require('../controllers/BookingController');
const verifyToken = require('../middlewares/verifyToken');

const router= require('express').Router();

router.post('/booking',verifyToken,createBooking)
router.get('/get-booking',verifyToken,getBooking)
router.get('/get-booking-by-id/:id',verifyToken,getBookingById)
router.get('/get-bookings-by-staff/:staffId',verifyToken,getBookingsByStaff);





module.exports = router;