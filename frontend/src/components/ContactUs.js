import React from 'react';
import { useForm } from 'react-hook-form';
import { FaLeaf, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaUser, FaComment } from 'react-icons/fa';
import bg from '../assets/contact-map.png'

const ContactUs = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = data => {
        console.log(data);
        reset();
    };

    return (
        <div className='mt-20'>
            <div>
                <h1 className="text-6xl font-semibold text-center mb-5">
                    <span className='text-[#EC5598]'>Contact</span> Us
                </h1>
                <div className="divider w-80 mx-auto">
                    <FaLeaf className='text-2xl' />
                </div>
                <p className="max-w-3xl mx-auto text-center">
                    If you have any questions or need assistance, feel free to reach out to us.
                </p>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col md:flex-row mt-10  max-w-6xl mx-auto p-6">
                {/* Left side: Info */}
                <div className="bg-cover bg-center w-full md:w-1/3   text-white">
                    <div className="bg-[#EC5598] bg-opacity-60 p-6  h-full flex flex-col justify-center gap-4">
                        <div className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-xl text-[#EC5598]" />
                            <span>123 Main Street, City, Country</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-xl text-[#EC5598]" />
                            <span>contact@example.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-xl text-[#EC5598]" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaClock className="text-xl text-[#EC5598]" />
                            <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                        </div>
                    </div>
                </div>

                {/* Right side: Form */}
                <div className="w-full md:w-3/4 bg-[#F5F6F6]  p-8 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Your Name"
                                className="pl-10 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EC5598]"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Your Email"
                                className="pl-10 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EC5598]"
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
                            <input
                                type="tel"
                                {...register("phone")}
                                placeholder="Your Phone"
                                className="pl-10 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EC5598]"
                            />
                        </div>

                        {/* Message */}
                        <div className="relative">
                            <FaComment className="absolute left-3 top-3.5 text-gray-400" />
                            <textarea
                                {...register("message", { required: true })}
                                placeholder="Your Message"
                                rows={4}
                                className="pl-10 pt-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EC5598]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#EC5598] text-white py-2 rounded hover:bg-[#d14d87] transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
