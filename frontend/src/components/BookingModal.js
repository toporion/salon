import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosSecure from '../hook/AxiosSecure';

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
];

const BookingModal = ({ service, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [loading, setLoading] = useState(false);
  const axios = axiosSecure();

  const handleSubmit = async () => {
    if (!date || !timeSlot) {
      return alert('Please select both date and time slot');
    }

    try {
      setLoading(true);
      const res = await axios.post('/booking', {
        service: service._id,
        date,
        timeSlot,
      });

      alert('Booking created successfully!');
      onClose();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Book: {service.name}</h2>

        <label className="block mb-2">Select Date:</label>
        <DatePicker
          selected={date}
          onChange={(d) => setDate(d)}
          minDate={new Date()}
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Select Time Slot:</label>
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="">-- Choose a time slot --</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          >
            {loading ? 'Booking...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
