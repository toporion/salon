import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2'; // Ensure SweetAlert2 is imported
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState: { errors } ,reset} = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate=useNavigate()

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (data.profilePicture[0]) {
        formData.append('profilePicture', data.profilePicture[0]);
      }

      const res = await axios.post('http://localhost:8080/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        Swal.fire({
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 3000,
          timerProgressBar: true,
        });
      }
      
      reset(); // Reset the form after successful submission
      setImagePreview(null) // Clear the image preview
      
      console.log('User registered:', res.data);
      
      // maybe redirect or show success message
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex max-w-4xl mx-auto bg-slate-100 mt-4 mb-4 rounded-xl">
      
      {/* Left Side - Image Preview */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-yellow-400 p-8 rounded-xl">
        {imagePreview ? (
          <img src={imagePreview} alt="Profile Preview" className="w-60 h-60 object-cover rounded-full" />
        ) : (
          <div className="w-60 h-60 bg-white flex items-center justify-center rounded-full text-gray-400">
            Image Preview
          </div>
        )}
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full p-2 border rounded"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Profile Image</label>
            <input
              type="file"
              {...register('profilePicture')}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded"
          >
            Register
          </button>
          <p>Allready have an account ? <Link to={'/login'}><span className="font-bold text-pink-800">Login</span></Link></p>
        </form>
      </div>

    </div>
  );
};

export default Register;
