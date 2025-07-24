const { createBooking, getBooking, getBookingById} = require('../controllers/BookingController');
const verifyToken = require('../middlewares/verifyToken');

const router= require('express').Router();

router.post('/booking',verifyToken,createBooking)
router.get('/get-booking',verifyToken,getBooking)
router.get('/get-booking-by-id/:id',verifyToken,getBookingById)




module.exports = router;