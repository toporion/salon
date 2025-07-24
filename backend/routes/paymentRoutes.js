const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { createCheckoutSession, confirmPayment, getPaymentHistory, getAdminPaymentSummary } = require('../controllers/PaymentController');
const verifyRole = require('../middlewares/verifyRole');

router.post('/create-checkout-session', verifyToken, createCheckoutSession);
router.post('/confirm', verifyToken, confirmPayment);
router.get('/history', verifyToken, getPaymentHistory);
router.get('/admin/payment-summary', verifyToken,verifyRole('admin'), getAdminPaymentSummary);


module.exports = router;
