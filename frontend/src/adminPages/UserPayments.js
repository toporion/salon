import React, { useEffect, useState } from 'react';
import AxiosSecure from '../hook/AxiosSecure';


const UserPayments = () => {
    const axiosSecure = AxiosSecure();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axiosSecure.get('/history');
                console.log("Payment history response:", response.data.data);
                setPayments(response.data.data || []);
            } catch (error) {
                console.error("Failed to fetch payment history:", error);
            }
        };
        fetchPayments();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>
            {payments.length === 0 ? (
                <p>No payment records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Service</th>
                                <th className="p-2 border">Amount</th>
                                <th className="p-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id} className="text-center">
                                    <td className="p-2 border">
                                        {payment.bookingId?.service?.name || 'Service'}
                                    </td>
                                    <td className="p-2 border">${payment.amount.toFixed(2)}</td>
                                    <td className="p-2 border">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserPayments;
