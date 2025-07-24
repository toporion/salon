import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AxiosSecure from '../hook/AxiosSecure';


const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const bookingId = params.get("bookingId");
    const axiosSecure = AxiosSecure();

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                await axiosSecure.post(`/confirm`, { bookingId });
            } catch (error) {
                console.error("Error confirming payment:", error);
            }
        };

        if (bookingId) confirmPayment();
    }, [bookingId]);

    return (
        <div className="p-6 text-center">
            <h2 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h2>
            <p className="mt-4 text-lg">Your booking has been confirmed and marked as paid.</p>
        </div>
    );
};

export default PaymentSuccess;
