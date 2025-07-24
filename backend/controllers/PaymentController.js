
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
            success_url: `http://localhost:3000/admin/payment-success?bookingId=${booking._id}`,

            cancel_url: `http://localhost:3000/admin/get-booking`,
        });

        res.json({ url: session.url });
    } catch (err) {
        console.error("Checkout error", err);
        res.status(500).json({ error: "Server error" });
    }
};

const confirmPayment = async (req, res) => {
    try {
        const { bookingId } = req.body;
        const userId = req.user._id;

        // 🛑 Check if payment already exists
        const existingPayment = await PaymentModel.findOne({ bookingId });
        if (existingPayment) {
            return res.status(200).json({
                success: true,
                message: "Payment already confirmed",
                payment: existingPayment,
            });
        }

        // ✅ Update booking status
        const booking = await BookingModel.findByIdAndUpdate(
            bookingId,
            { status: "paid" },
            { new: true }
        );

        if (!booking) return res.status(404).json({ error: "Booking not found" });

        // 💾 Save new payment
        const payment = new PaymentModel({
            bookingId,
            userId,
            amount: booking.price,
        });

        await payment.save();

        res.status(200).json({ success: true, message: "Payment confirmed", payment });
    } catch (err) {
        console.error("Confirm payment error", err);
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


module.exports = { createCheckoutSession,confirmPayment,getPaymentHistory,getAdminPaymentSummary};
