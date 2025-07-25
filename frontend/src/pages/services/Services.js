import React, { useState } from 'react';
import serviceBanner from '../../assets/bg-9.jpg';
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../../hook/AxiosPublic';
import UseAuth from '../../hook/UseAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Optional: for alert

// --- Single Service Card ---
const ServiceCard = ({ service }) => {
    const { isAuthenticated } = UseAuth();
    const navigate = useNavigate();

    const handleBooking = () => {
        if (isAuthenticated) {
            navigate(`/admin/appointment/${service._id}`);
        } else {
            toast.error("Please login to book a service"); // optional
            navigate('/login');
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
            <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                <p className="text-sm text-gray-500">{service.category}</p>
                <p className="text-gray-700 text-sm">{service.description.slice(0, 80)}...</p>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-pink-600 font-semibold">${service.price}</span>
                    <span className="text-xs text-gray-400">{service.duration} mins</span>
                </div>
                <button
                    onClick={handleBooking}
                    className='bg-pink-500 py-2 px-3 text-white rounded-sm mt-4 hover:bg-pink-600 transition'
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

// --- Services List ---
const Services = () => {
    const axiosPublic = AxiosPublic();
    const [page, setPage] = useState(1);
    const limit = 4;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['services', page],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allServices?page=${page}&limit=${limit}`);
            return res.data.data;
        },
        keepPreviousData: true,
    });

    const services = data?.allServices || [];
    const totalPages = data?.totalPages || 1;

    return (
        <div>
            {/* Banner */}
            <div className="relative w-full h-[300px] overflow-hidden">
                <img
                    src={serviceBanner}
                    alt="Service Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <p className="text-white text-4xl font-bold">Our Premium Services</p>
                </div>
            </div>

            <div className='text-center mt-6'>
                <p className='text-3xl font-bold'>
                    Get Our <span className='text-pink-600'>Premium</span> Services
                </p>
            </div>

            {/* Services Grid */}
            <div className="max-w-6xl mx-auto px-4 py-10">
                {isLoading ? (
                    <p className="text-center text-xl">Loading...</p>
                ) : isError ? (
                    <p className="text-center text-red-500">Failed to load services.</p>
                ) : services.length === 0 ? (
                    <p className="text-center text-gray-500">No services found.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map(service => (
                                <ServiceCard key={service._id} service={service} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-4 mt-10">
                            <button
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <span className="text-lg font-semibold">Page {page} of {totalPages}</span>
                            <button
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Services;
