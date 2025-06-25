import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../hook/AxiosSecure";
import { useEffect } from "react";



const Appointment = () => {
    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const selectedServiceId = watch("service");

    const axiosSecure = AxiosSecure()

    const fetchServices = async () => {
        const res = await axiosSecure.get("/allServices");
        console.log(res.data.data)
        return res.data.data.allServices;
    };

    const fetchStaffs = async () => {
        const res = await axios.get("http://localhost:8080/api/get-staff");
        console.log('see now staff', res.data.data)
        return res.data.data;
    };
    // Fetch services
    const {
        data: services = [],
        isLoading: loadingServices,
        error: serviceError,
    } = useQuery({
        queryKey: ["services"],
        queryFn: fetchServices,
    });

    useEffect(() => {
        if (selectedServiceId && services.length > 0) {
            const selectedService = services.find(
                (service) => service._id === selectedServiceId
            );
            if (selectedService) {
                setValue("price", selectedService.price);
            }
        }
    }, [selectedServiceId, services, setValue]);

    // Fetch staff
    const {
        data: staffs = [],
        isLoading: loadingStaffs,
        error: staffError,
    } = useQuery({
        queryKey: ["staffs"],
        queryFn: fetchStaffs,
    });

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/api/appointment", data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("✅ Appointment created successfully!");
            reset();
        } catch (err) {
            console.error("Appointment error:", err);
            alert("❌ Booking failed.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                📅 Create Appointment
            </h2>

            {(loadingServices || loadingStaffs) && (
                <p className="text-center text-gray-500">Loading options...</p>
            )}

            {(serviceError || staffError) && (
                <p className="text-red-500 text-center">Failed to load data.</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Customer Name */}
                <div>
                    <label className="block mb-1 font-medium">Customer Name</label>
                    <input
                        type="text"
                        {...register("customerName")}
                        placeholder="e.g., Nadia"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Service */}
                <div>
                    <label className="block mb-1 font-medium">Select Service</label>
                    <select
                        {...register("service", { required: true })}
                        className="w-full px-4 py-2 border rounded-md"
                    >
                        <option value="">-- Choose a service --</option>
                        {services.map((service) => (
                            <option key={service._id} value={service._id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Staff */}
                <div>
                    <label className="block mb-1 font-medium">Assign Staff</label>
                    <select
                        {...register("staff", { required: true })}
                        className="w-full px-4 py-2 border rounded-md"
                    >
                        <option value="">-- Choose a staff --</option>
                        {staffs.map((staff) => (
                            <option key={staff._id} value={staff._id}>
                                {staff.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className="block mb-1 font-medium">Date</label>
                    <input
                        type="date"
                        {...register("date", { required: true })}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                {/* Time */}
                <div>
                    <label className="block mb-1 font-medium">Time</label>
                    <input
                        type="time"
                        {...register("time", { required: true })}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input
                        type="number"
                        {...register("price", { required: true })}
                        placeholder="৳"
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Book Appointment
                </button>
            </form>
        </div>
    );
};

export default Appointment;
