import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const ServiceCard = ({ service }) => {




  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-2xl transition-all"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div>
        <h3 className="text-xl font-semibold">{service.name}</h3>
        <p className="text-gray-500 text-sm">{service.category}</p>
        <p className="text-gray-700 mt-2 font-medium">৳{service.price}</p>
      </div>
      <Link to={`/admin/appointment/${service._id}`} className="mt-4">
        <button

          className="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded hover:opacity-90 transition duration-300"
        >
          Book Now
        </button>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
