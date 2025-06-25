import React, { useState, useEffect } from 'react';
import AxiosSecure from '../../hook/AxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AllServices = () => {
    const axiosSecure = AxiosSecure();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    const limit = 5;

    // Debounce search input
    useEffect(() => {
        const delay = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); // Reset to first page on new search
        }, 500);
        return () => clearTimeout(delay);
    }, [searchTerm]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['services', page, debouncedSearch],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allServices?page=${page}&limit=${limit}&search=${debouncedSearch}`);
            return res.data.data;
        },
        keepPreviousData: true,
    });

    const services = data?.allServices || [];
    const totalPages = data?.totalPages || 1;

 

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this service?');
        if (!confirm) return;

        try {
            const res = await axiosSecure.delete(`/deleteService/${id}`);
            if (res.data.success) {
                alert('Service deleted successfully');
                queryClient.invalidateQueries(['services']); // Refetch updated data
            } else {
                alert('Failed to delete the service');
            }
        } catch (err) {
            console.error(err);
            alert('Error occurred while deleting service');
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">Error loading services</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">All Services</h2>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded w-full md:w-1/3"
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2 border">#</th>
                            <th className="p-2 border">Image</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Price ($)</th>
                            <th className="p-2 border">Duration</th>
                            <th className="p-2 border">Active</th>
                            <th className="p-2 border">Created At</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={service._id} className="hover:bg-gray-50">
                                <td className="p-2 border">{(page - 1) * limit + index + 1}</td>
                                <td className="p-2 border">
                                    <img src={service.image} alt={service.name} className="w-14 h-14 object-cover rounded" />
                                </td>
                                <td className="p-2 border">{service.name}</td>
                                <td className="p-2 border">{service.category}</td>
                                <td className="p-2 border">${service.price}</td>
                                <td className="p-2 border">{service.duration} min</td>
                                <td className="p-2 border">
                                    <span className={service.active ? 'text-green-600' : 'text-red-500'}>
                                        {service.active ? 'Yes' : 'No'}
                                    </span>
                                </td>
                                <td className="p-2 border">{new Date(service.createdAt).toLocaleDateString()}</td>
                                <td className="p-2 border">
                                    <div className="flex gap-2">
                                        <Link to={`/admin/updateData/${service._id}`}>
                                            <button
                                                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                                            >
                                                Update
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                    disabled={page === 1}
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-2 border rounded ${page === i + 1 ? 'bg-gray-200 font-bold' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllServices;
