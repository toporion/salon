import React from 'react';
import UseAuth from '../../hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../../hook/AxiosPublic';
import AxiosSecure from '../../hook/AxiosSecure';
import ListService from '../../components/Services/ListService';

const AdminHome = () => {
  const { user, loading: userLoading } = UseAuth();
  const axiosPublic = AxiosPublic();
  const axiosSecure = AxiosSecure();

  // For users - get services
  const {
    data: services = [],
    isLoading: servicesLoading,
  } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosPublic.get('/allServices');
      return res.data.data.allServices;
    },
    enabled: !!user && user.role === 'user',
  });

  // For admins - get payment summary
  const {
    data: summaryData = [],
    isLoading: summaryLoading,
  } = useQuery({
    queryKey: ['admin-payment-summary'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/payment-summary');
      return res.data.data;
    },
    enabled: !!user && user.role === 'admin',
  });

  if (userLoading || (user?.role === 'user' && servicesLoading)) {
    return <p className="text-3xl text-center mt-20">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
      <p className="text-xl mb-6">You are logged in as <strong>{user?.role}</strong></p>

      {/* --- USER ROLE --- */}
      {user?.role === 'user' && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Available Services</h2>
          <ListService />
        </div>
      )}

      {/* --- STAFF ROLE --- */}
      {user?.role === 'staff' && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Staff Panel</h2>
          <p>You can view your assigned appointments and tasks here.</p>
        </div>
      )}

      {/* --- ADMIN ROLE --- */}
      {user?.role === 'admin' && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <p className="mb-6">Manage users, payments, and appointments.</p>

          {/* Summary Table */}
          {summaryLoading ? (
            <p className="text-center">Loading payment summary...</p>
          ) : (
            <div className="overflow-x-auto">
              <h3 className="text-xl font-bold mb-2">Monthly Payment Summary</h3>
              <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 border">Month</th>
                    <th className="p-3 border">Year</th>
                    <th className="p-3 border">Total Payments</th>
                    <th className="p-3 border">Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryData.map((item, index) => (
                    <tr key={index} className="text-center hover:bg-gray-50">
                      <td className="p-3 border">{item._id.month}</td>
                      <td className="p-3 border">{item._id.year}</td>
                      <td className="p-3 border">{item.paymentCount}</td>
                      <td className="p-3 border text-green-700 font-semibold">
                        ${item.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
