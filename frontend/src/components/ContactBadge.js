import React from 'react';
import bg from '../assets/bg7.jpg';

const ContactBadge = () => {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat text-white"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#EC5598]"></div>

            {/* Content */}
            <div className="relative p-8 max-w-6xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-lg md:max-w-2xl">
                    We are here to assist you with any inquiries or support you may need. Reach out to us anytime!
                </p>
                <button className="bg-slate-600 px-6 py-2 rounded">Contact Us</button>
            </div>
        </div>
    );
};

export default ContactBadge;
