import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import AxiosSecure from '../../hook/AxiosSecure';

const AddStaff = () => {
  const axiosSecure=AxiosSecure()
  const [serviceOptions, setServiceOptions] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch services for dropdown
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axiosSecure.get('/allServices'); // your API endpoint
        console.log('see the service now',res.data.data.allServices)
        const formatted = res.data.data.allServices.map(service => ({
          value: service._id,
          label: service.name
        }));
        setServiceOptions(formatted);
      } catch (err) {
        console.error('Failed to load services:', err);
      }
    };
    fetchServices();
  }, []);

  const onSubmit =async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('role', data.role);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('contact', data.contact);
    formData.append('active', data.active || false);
    formData.append('createdBy', 'USER_ID'); // replace with actual ID

    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

    // Add selected service IDs
    data.services?.forEach(service => {
      formData.append('services', service.value);
    });

   const res=await axiosSecure.post('/staff',formData)
   console.log(res.data)
    reset();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Staff</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            placeholder="Type Name"
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
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            {...register('email', { required: 'Name is required' })}
            placeholder="Type email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
          type='password'
            {...register('password', { required: 'Role is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
            
          
          {errors.password && <p className="text-red-500 text-xs">{errors.role.message}</p>}
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

        {/* Services Multi-Select Dropdown */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Services</label>
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
            defaultChecked
            className="h-4 w-4 text-blue-600"
          />
          <label className="ml-2 text-sm text-gray-700">Active</label>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Add Staff
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
