import React, { useEffect, useState } from 'react';
import AxiosSecure from '../../hook/AxiosSecure';
import { useNavigate } from 'react-router-dom';





const GetBooking = () => {
    const axiosSecure = AxiosSecure();
    const [bookings, setBookings] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchBookings = async (userId) => {
            try {
                const response = await axiosSecure.get('/get-booking');
                console.log('Fetched bookings:', response.data.data.bookings);
                setBookings(response.data.data.bookings || []);
                setTotalPrice(response.data.totalPrice || 0);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);




    const handleCheckout = async (booking) => {
        try {
            const response = await axiosSecure.post('/create-checkout-session', {
                bookingId: booking._id,
            });

            window.location.href = response.data.url; // Just redirect directly
        } catch (err) {
            console.error('Stripe checkout error:', err);
        }
    };









    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Service</th>
                            <th className="p-2 border">Date</th>

                            <th className="p-2 border">Status</th>
                            <th className="p-2 border">Total Price</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="text-center">
                                <td className="p-2 border">{booking.service?.name || 'N/A'}</td>
                                <td className="p-2 border">{new Date(booking.date).toLocaleDateString()}</td>

                                <td className="p-2 border capitalize">{booking.status}</td>
                                <td className="p-2 border">
                                    {booking.price !== undefined ? `$${booking.price.toFixed(2)}` : 'N/A'}
                                </td>

                                <td className="p-2 border">
                                    {booking.status === 'booked' && (
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                            onClick={() => handleCheckout(booking)}
                                        >
                                            Checkout
                                        </button>


                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Total Price Display */}
                <div className="mt-4 text-right text-lg font-semibold">
                    Total Price: ${totalPrice.toFixed(2)}
                </div>
            </div>
        </div>
    );


};

export default GetBooking;
