
const mongoose = require('mongoose'); // Make sure you have this at the top
const BookingModel = require('../models/BookingModel');
const PaymentModel = require('../models/PaymentModel'); // (you'll create this)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await BookingModel.findById(bookingId).populate('service');
        if (!booking) return res.status(404).json({ error: "Booking not found" });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: booking.service?.name || "Service",
                    },
                    unit_amount: Math.round(booking.price * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `https://salon-8j7i.vercel.app/admin/payment-success?bookingId=${booking._id}`,

            cancel_url: `https://salon-8j7i.vercel.app/admin/get-booking`,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Checkout error", err);
        res.status(500).json({ error: "Server error" });
    }
};
// In your PaymentController.js
const confirmPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.user._id;

        console.log("User ID from token for confirmation:", userId);
        console.log("Booking ID received for confirmation:", bookingId);

        const existingPayment = await PaymentModel.findOne({ bookingId });
        if (existingPayment) {
            console.warn(`⚠️ Duplicate payment attempt for booking: ${bookingId}. Payment already exists.`);
            return res.status(200).json({
                success: true,
                message: "Payment already confirmed",
                payment: existingPayment,
            });
        }

        // ONLY THIS BLOCK RUNS ON THE *FIRST* SUCCESSFUL ATTEMPT
        const booking = await BookingModel.findByIdAndUpdate(
            bookingId,
            { status: "paid" },
            { new: true }
        );

        if (!booking) {
            console.error(`❌ Error: Booking not found for bookingId: ${bookingId}. Cannot create payment.`);
            return res.status(404).json({ error: "Booking not found" });
        }

        const payment = new PaymentModel({
            bookingId,
            userId,
            amount: booking.price,
        });

        await payment.save();
        // THIS IS THE SUCCESS LOG YOU'RE LOOKING FOR!
        console.log(`✅ NEW PAYMENT SUCCESSFULLY SAVED to DB for bookingId: ${bookingId}, Payment ID: ${payment._id}`);
        console.log(`   Amount: ${payment.amount}, User ID: ${payment.userId}, Date: ${payment.paymentDate}`);

        res.status(200).json({ success: true, message: "Payment confirmed", payment });
    } catch (err) {
        console.error("❌ Critical Error: Confirm payment failed at some stage!", err);
        res.status(500).json({ error: "Server error" });
    }
};




const getPaymentHistory = async (req, res) => {
    try {
        console.log("Decoded user from token:", req.user); // 👈 Add this
        const userId = req.user._id;

        const history = await PaymentModel.find({ userId }).populate({
            path: 'bookingId',
            populate: { path: 'service' },
        });

        console.log("Fetched history:", history);

        res.status(200).json({ success: true, data: history });
    } catch (err) {
        console.error("Error fetching history:", err); // 👈 Full error log
        res.status(500).json({ error: "Error fetching history" });
    }
};

const getAdminPaymentSummary = async (req, res) => {
    try {
        const summary = await PaymentModel.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$paymentDate" }, month: { $month: "$paymentDate" } },
                    totalAmount: { $sum: "$amount" },
                    paymentCount: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": -1, "_id.month": -1 }
            }
        ]);

        res.status(200).json({ success: true, data: summary });
    } catch (err) {
        console.error("Admin summary error:", err);
        res.status(500).json({ error: "Could not get admin summary" });
    }
};


module.exports = { createCheckoutSession, confirmPayment, getPaymentHistory, getAdminPaymentSummary };
