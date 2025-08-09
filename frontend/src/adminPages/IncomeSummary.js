import React, { useEffect, useState } from "react";
import AxiosSecure from "../hook/AxiosSecure";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const IncomeSummary = () => {
  const axiosSecure = AxiosSecure();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosSecure.get("/income-summary");
        setSummary(res.data.data);
      } catch (error) {
        console.error("Error fetching income summary:", error);
      }
    };
    fetchSummary();
  }, [axiosSecure]);

  if (!summary) {
    return <p className="text-center text-gray-500 mt-10">Loading income summary...</p>;
  }

  // Prepare chart data from monthly income
  const chartData = summary.monthlyIncome.map((item) => ({
    month: new Date(0, item._id.month - 1).toLocaleString("default", { month: "short" }),
    income: item.total
  }));

  return (
    <div className="p-6">
      {/* Income Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-6 text-center border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">Today's Income</h3>
          <p className="text-2xl font-bold text-green-600">${summary.dayIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">This Month</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${summary.monthlyIncome.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 text-center border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">This Year</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${summary.yearlyIncome.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Monthly Income Chart */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Income Overview</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="income" fill="#4f46e5" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeSummary;
