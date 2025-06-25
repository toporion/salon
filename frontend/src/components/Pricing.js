import React, { useState } from 'react';
import { IoIosLeaf } from 'react-icons/io';
import tabImg1 from '../assets/special-offer.jpg'
import tabImg2 from '../assets/s3.jpg'
import tabImg3 from '../assets/s5.jpg'
import { FaSprayCanSparkles } from "react-icons/fa6";

import { FaSpa, FaRegSmile, FaHandHoldingHeart, FaAirFreshener, FaBurn } from "react-icons/fa";

const pricingData = [
    {
        name: 'Spa',
        image: tabImg1,
        title: 'Luxury Spa Treatment',
        description: 'Relax with our luxury spa packages including steam bath, body wrap, and aromatherapy.',
        price: '$120',
        icon: <FaSpa className="text-2xl mb-1 mx-auto" />
    },
    {
        name: 'Facial',
        image: tabImg2,
        title: 'Deep Cleansing Facial',
        description: 'A refreshing facial that rejuvenates your skin and boosts your glow.',
        price: '$80',
        icon: <FaRegSmile className="text-2xl mb-1 mx-auto" />
    },
    {
        name: 'Massage',
        image: tabImg3,
        title: 'Swedish Full Body Massage',
        description: 'A relaxing massage to relieve stress and muscle tension.',
        price: '$100',
        icon: <FaHandHoldingHeart className="text-2xl mb-1 mx-auto" />
    },
    {
        name: 'Hair Makeup',
        image: tabImg3,
        title: 'Professional Hair & Makeup',
        description: 'Get party-ready with our expert styling and makeup artists.',
        price: '$150',
        icon: <FaAirFreshener className="text-2xl mb-1 mx-auto" />
    },
    {
        name: 'Waxing',
        image: tabImg3,
        title: 'Smooth Waxing Package',
        description: 'Full body waxing with gentle, skin-friendly products.',
        price: '$90',
        icon: <FaBurn className="text-2xl mb-1 mx-auto" />
    },
];



const Pricing = () => {
    const [activeTab, setActiveTab] = useState(pricingData[0]);

    return (
        <div className="mt-16 px-4 max-w-6xl mx-auto">
            {/* Title */}
            <h1 className="text-6xl font-semibold text-center mb-5">
                <span className='text-[#EC5598]'>Our</span> Pricing
            </h1>
            <div className="divider w-80 mx-auto"><IoIosLeaf className='text-5xl' /></div>
            <p className="max-w-3xl mx-auto text-center mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit elit turpis,
                a porttitor tellus sollicitudin at.
            </p>

            {/* Tabs - Horizontal */}
            <div className="flex justify-center flex-wrap mb-10 ">
                {pricingData.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => setActiveTab(item)}
                        className={`w-56 h-32 flex flex-col items-center justify-center border   transition-all duration-300 ${activeTab.name === item.name
                            ? 'bg-[#EC5598] text-white  shadow-md'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-pink-50'
                            }`}
                    >
                        {item.icon}
                        <span className="text-xl font-medium mt-1">{item.name}</span>
                    </button>
                ))}
            </div>


            {/* Content */}
            <div className="max-w-6xl mx-auto bg-white rounded-xl   flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={activeTab.image}
                    alt={activeTab.name}
                    className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                />
                <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-2">{activeTab.title}</h3>
                    <p className="mb-3 text-gray-700">{activeTab.description}</p>
                    <p className="text-xl font-semibold text-[#EC5598]">{activeTab.price}</p>
                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <button className="mt-4 bg-[#EC5598] hover:bg-pink-600 text-white py-2 px-6 rounded-sm transition-all">
                            Book Now
                        </button>
                        <button className="mt-4 bg-[#3f3338] hover:bg-pink-600 text-white py-2 px-6 rounded-sm transition-all">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
