const { createBooking } = require('../controllers/BookingController');
const verifyToken = require('../middlewares/verifyToken');

const router= require('express').Router();

router.post('/booking',verifyToken,createBooking)

module.exports = router;