import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import AxiosSecure from '../../hook/AxiosSecure';
import Select from 'react-select';
import Swal from 'sweetalert2';


const UpdateStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = AxiosSecure();

  const [serviceOptions, setServiceOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

useEffect(() => {
  const fetchStaff = async () => {
    try {
      const res = await axiosSecure.get(`/staff/${id}`);
      const staff = res.data.data;

      const formattedServices = staff.services.map(s => ({
        value: s._id || s.value,
        label: s.name || s.label
      }));

      reset({
        name: staff.name,
        role: staff.role,
        contact: staff.contact,
        active: staff.active,
        services: formattedServices,
      });

    } catch (err) {
      console.error('Failed to fetch staff:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axiosSecure.get('/allServices');
      const formatted = res.data.data.allServices.map(service => ({
        value: service._id,
        label: service.name
      }));
      setServiceOptions(formatted);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    }
  };

  fetchStaff();
  fetchServices(); // ✅ THIS WAS MISSING

}, []);


const onSubmit = async (data) => {
  // Show confirmation before update
  const confirm = await Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to update this staff info!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, update it!'
  });

  if (!confirm.isConfirmed) return;

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('role', data.role);
  formData.append('contact', data.contact);
  formData.append('active', data.active || false);

  if (data.image?.[0]) {
    formData.append('image', data.image[0]);
  }

  data.services?.forEach(service => {
    formData.append('services', service.value);
  });

  try {
    const res = await axiosSecure.patch(`/update-staff/${id}`, formData);

    // ✅ Success alert
    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: 'Staff information has been updated.',
      timer: 2000,
      showConfirmButton: false
    });

    navigate('/admin/allStaff');
  } catch (err) {
    console.error('Failed to update staff:', err);

    // ❌ Error alert
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Something went wrong while updating.',
    });
  }
};

  if (loading) return <p className="p-4 text-center">Loading staff info...</p>;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Staff</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            {...register('role', { required: 'Role is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select role</option>
            <option value="stylist">Stylist</option>
            <option value="colorist">Colorist</option>
            <option value="receptionist">Receptionist</option>
            <option value="assistant">Assistant</option>
            <option value="manager">Manager</option>
            <option value="other">Other</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
        </div>

        {/* Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            {...register('contact', { required: 'Contact is required' })}
            placeholder="01XXXXXXXXX"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.contact && <p className="text-red-500 text-xs">{errors.contact.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            type="file"
            accept="image/*"
            {...register('image')}
            className="w-full border border-gray-300 p-1 rounded-md"
          />
        </div>

        {/* Services */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Select Services</label>
          <Controller
            name="services"
            control={control}
            rules={{ required: 'Select at least one service' }}
            render={({ field }) => (
              <Select
                {...field}
                options={serviceOptions}
                isMulti
                placeholder="Select services"
                className="react-select-container"
                classNamePrefix="react-select"
              />
            )}
          />
          {errors.services && <p className="text-red-500 text-xs">{errors.services.message}</p>}
        </div>

        {/* Active */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            {...register('active')}
            className="h-4 w-4 text-blue-600"
          />
          <label className="ml-2 text-sm text-gray-700">Active</label>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
          >
            Update Staff
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStaff;
