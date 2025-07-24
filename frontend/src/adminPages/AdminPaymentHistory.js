import React, { useEffect, useState } from 'react';
import AxiosSecure from '../hook/AxiosSecure';

const AdminPaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const axiosSecure = AxiosSecure()

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get('/payment/history');
        console.log('Payment history response:', res.data);
        setPayments(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch payment history:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Payment History</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Amount ($)</th>
              <th className="p-2 border">Paid On</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="text-center">
                <td className="p-2 border">{payment.userId?.name || 'N/A'}</td>
                <td className="p-2 border">{payment.userId?.email || 'N/A'}</td>
                <td className="p-2 border">${payment.amount}</td>
                <td className="p-2 border">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPaymentHistory;
