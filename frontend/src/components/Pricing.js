import React, { useEffect, useState } from 'react';
import { IoIosLeaf } from 'react-icons/io';
import axios from 'axios';
import { FaSpa, FaRegSmile, FaHandHoldingHeart, FaAirFreshener, FaBurn } from "react-icons/fa";

const categoryIcons = {
    Hair: <FaAirFreshener className="text-2xl mb-1 mx-auto" />,
    Face: <FaRegSmile className="text-2xl mb-1 mx-auto" />,
    Body: <FaSpa className="text-2xl mb-1 mx-auto" />,
    Nails: <FaHandHoldingHeart className="text-2xl mb-1 mx-auto" />,
    Other: <FaBurn className="text-2xl mb-1 mx-auto" />,
};

const Pricing = () => {
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/allServices');
                const all = res.data?.data?.allServices || [];
                setServices(all);
                if (all.length > 0) {
                    setActiveTab(all[0]);
                }
            } catch (err) {
                console.error('Error fetching services:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="mt-16 px-4 max-w-6xl mx-auto">
            <h1 className="text-6xl font-semibold text-center mb-5">
                <span className='text-[#EC5598]'>Our</span> Pricing
            </h1>
            <div className="divider w-80 mx-auto"><IoIosLeaf className='text-5xl' /></div>
            <p className="max-w-3xl mx-auto text-center mb-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit elit turpis,
                a porttitor tellus sollicitudin at.
            </p>

            {/* Tabs */}
            {loading ? (
                <p className="text-center">Loading services...</p>
            ) : services.length === 0 ? (
                <p className="text-center text-red-500">No services available</p>
            ) : (
                <div className="flex justify-center flex-wrap mb-10">
                    {services.map((item) => (
                        <button
                            key={item._id}
                            onClick={() => setActiveTab(item)}
                            className={`w-56 h-32 flex flex-col items-center justify-center border transition-all duration-300 ${activeTab?._id === item._id
                                ? 'bg-[#EC5598] text-white shadow-md'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-pink-50'
                                }`}
                        >
                            {categoryIcons[item.category] || <FaSpa className="text-2xl mb-1 mx-auto" />}
                            <span className="text-xl font-medium mt-1">{item.name}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Content */}
            {activeTab && (
                <div className="max-w-6xl mx-auto bg-white rounded-xl flex flex-col md:flex-row gap-6 items-center">
                    <img
                        src={activeTab.image || 'https://via.placeholder.com/400x250?text=No+Image'}
                        alt={activeTab.name}
                        className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                    />
                    <div className="md:w-1/2">
                        <h3 className="text-2xl font-bold mb-2">{activeTab.name}</h3>
                        <p className="mb-3 text-gray-700">{activeTab.description}</p>
                        <p className="text-xl font-semibold text-[#EC5598]">${activeTab.price}</p>
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
            )}
        </div>
    );
};

export default Pricing;
