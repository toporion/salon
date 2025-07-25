import React from 'react';
import { FaUser, FaEnvelope, FaCommentDots, FaPhoneAlt, FaMapMarkedAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">Contact Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                {/* Left - Google Map */}
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <iframe
                        title="Salon Location"
                        className="w-full h-96"
                        frameBorder="0"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.878628154565!2d90.39111161543132!3d23.750947694916677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1d4a36f84eb36231!2sDhaka!5e0!3m2!1sen!2sbd!4v1621062761301!5m2!1sen!2sbd"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Right - Contact Form */}
                <div className="bg-white shadow-xl rounded-xl p-8">
                    <form className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="flex items-center text-gray-700 font-semibold">
                                <FaUser className="mr-2 text-pink-500" /> Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="flex items-center text-gray-700 font-semibold">
                                <FaEnvelope className="mr-2 text-pink-500" /> Email
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="flex items-center text-gray-700 font-semibold">
                                <FaPhoneAlt className="mr-2 text-pink-500" /> Phone
                            </label>
                            <input
                                type="text"
                                placeholder="+880 1234 567890"
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="flex items-center text-gray-700 font-semibold">
                                <FaCommentDots className="mr-2 text-pink-500" /> Message
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Your message..."
                                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white font-semibold py-2 rounded-lg hover:bg-pink-700 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
