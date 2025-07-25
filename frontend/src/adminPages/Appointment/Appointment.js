import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AxiosSecure from "../../hook/AxiosSecure";
import { useEffect } from "react";
import { useParams } from "react-router-dom";



const Appointment = () => {
    const { id } = useParams()
    const [serviceData, setServiceData] = useState(null);


    const { register, handleSubmit, reset, watch, setValue } = useForm();


    const axiosSecure = AxiosSecure()

    const fetchSingleService = async () => {
        const res = await axiosSecure.get(`/singleService/${id}`);
        console.log('see all service by id', res.data.data)
        return res.data.data;
    };

    const fetchStaffs = async () => {
        const res = await axiosSecure.get("/get-staff");
        console.log('see now staff', res.data.data)
        return res.data.data;
    };


    useEffect(() => {
        const getService = async () => {
            const data = await fetchSingleService();
            setServiceData(data);

            setValue("service", data._id); // Use ID for backend
            setValue("price", data.price);
        };

        getService();
    }, [id, setValue]);


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
            if (!serviceData) return alert("Service data not loaded");

            const token = localStorage.getItem("token");

            // Inject the service ID before sending
            const bookingData = {
                ...data,
                service: serviceData._id, // 👈 Here we assign the correct ObjectId
            };
            // ✅ Remove status if somehow it's included
            delete bookingData.status;
            console.log("Booking data to send:", bookingData);
            await axios.post("https://salon-8j7i.vercel.app/api/appointment", bookingData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("✅ Appointment created successfully!");
            reset();
        } catch (err) {
            console.error("Appointment error:", err);
            alert("❌ Booking failed.");
        }
    };
    if (loadingStaffs) return <div>Loading staffs...</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                📅 Create Appointment
            </h2>



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


                {/* service */}
                <div>
                    <label className="block mb-1 font-medium">Service</label>
                    <input
                        type="text"
                        value={serviceData?.name || ''}
                        readOnly
                        className="w-full px-4 py-2 border rounded-md bg-gray-100"
                    />
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
                        readOnly
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
