import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AxiosSecure from '../hook/AxiosSecure';

const PaymentSuccess = () => {
    const [params] = useSearchParams();
    const bookingId = params.get("bookingId");
    const axiosSecure = AxiosSecure();
    const [isConfirming, setIsConfirming] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const confirmPayment = async () => {
            if (!bookingId || sessionStorage.getItem(`paid_${bookingId}`)) return;

            setIsConfirming(true);

            try {
                const res = await axiosSecure.post(`/confirm`, { bookingId });
                console.log("✅ Payment confirmed:", res.data);
                sessionStorage.setItem(`paid_${bookingId}`, 'true');
                setConfirmed(true);
            } catch (error) {
                console.error("❌ Error confirming payment:", error);
            } finally {
                setIsConfirming(false);
            }
        };

        confirmPayment();
    }, [bookingId]); // ✅ Correct dependency: ONLY bookingId

    return (
        <div className="p-6 text-center">
            <h2 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h2>
            <p className="mt-4 text-lg">Your booking has been confirmed and marked as paid.</p>
            {isConfirming && <p className="mt-2 text-sm text-gray-500">Confirming your payment...</p>}
            {confirmed && <p className="mt-2 text-sm text-blue-500">✔️ Payment recorded.</p>}
            {!isConfirming && bookingId && <p className="mt-2 text-sm text-gray-500">Booking ID: {bookingId}</p>}
        </div>
    );
};

export default PaymentSuccess;
