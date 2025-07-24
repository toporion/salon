import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AxiosSecure from '../../hook/AxiosSecure';

const Checkout = () => {
  const { bookingId } = useParams();
  const axiosSecure = AxiosSecure();

  useEffect(() => {
    const createSession = async () => {
      try {
        const response = await axiosSecure.post('/create-checkout-session', { bookingId });
        window.location.href = response.data.url; // Redirect to Stripe Checkout
      } catch (err) {
        console.error('Stripe session error:', err);
      }
    };

    createSession();
  }, [bookingId]);

  return (
    <div className="p-6 text-center text-lg">
      Redirecting to payment...
    </div>
  );
};

export default Checkout;
