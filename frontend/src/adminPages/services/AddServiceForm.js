import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AxiosSecure from '../../hook/AxiosSecure';

const AddServiceForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const axiosSecure=AxiosSecure()

  const onSubmit = async (data) => {

  
    try {
        const formData=new FormData();
        formData.append('name',data.name)
        formData.append('price',data.price)
        formData.append('duration',data.duration)
        formData.append('category',data.category)
        formData.append('description',data.description)
        if(data.image[0]){
            formData.append('image',data.image[0])
        }

      const res = await axiosSecure.post('/addService', formData);
      console.log('Service added:', res.data);
      alert('Service added successfully!');
      reset();
    } catch (err) {
      console.error(err);
      alert('Failed to add service');
    }
  };

 

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Service</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Service Name */}
        <div>
          <label className="block font-semibold">Service Name</label>
          <input
            type="text"
            {...register('name', { required: 'Service name is required' })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold">Price (৳)</label>
          <input
            type="number"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="block font-semibold">Duration (minutes)</label>
          <input
            type="number"
            {...register('duration', {
              required: 'Duration is required',
              min: { value: 1, message: 'Must be at least 1 minute' },
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold">Category</label>
          <select
            {...register('category')}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          >
            <option value="Hair">Hair</option>
            <option value="Face">Face</option>
            <option value="Body">Body</option>
            <option value="Nails">Nails</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            {...register('description')}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            rows={3}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold">Service Image</label>
          <input
            type="file"  
            {...register('image')}  
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
        </div>
      

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow"
          >
            {isSubmitting ? 'Submitting...' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceForm;
