// controllers/adminController.js
const PaymentModel = require('../models/PaymentModel');
const mongoose = require('mongoose');

const getIncomeSummary = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // DAILY INCOME
    const todayIncomeAgg = await PaymentModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay, $lt: endOfDay },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    const dayIncome = todayIncomeAgg[0]?.total || 0;

    // MONTHLY INCOME FOR CURRENT YEAR
    const currentYear = now.getFullYear();
    const monthlyIncome = await PaymentModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);

    // YEARLY INCOME (OPTIONAL)
    const yearlyIncome = await PaymentModel.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.year": 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        dayIncome,
        monthlyIncome,
        yearlyIncome,
      },
    });

  } catch (error) {
    console.error("Income Summary Error:", error);
    res.status(500).json({ success: false, message: "Failed to get income summary" });
  }
};

module.exports = {
  getIncomeSummary,
};
