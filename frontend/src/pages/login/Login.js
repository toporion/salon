import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../authProvider/AuthProvider";

export default function Login() {
  const { register, handleSubmit, watch } = useForm();
  const [userImage, setUserImage] = useState(null);
  const emailValue = watch("email");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Simple email validation function
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // ✅✅✅ Modified useEffect starts here
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (emailValue && isValidEmail(emailValue)) {
        fetch(`http://localhost:8080/api/user-by-email?email=${emailValue}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.user?.image) {
              setUserImage(data.user.image);
            } else {
              setUserImage(null);
            }
          })
          .catch((err) => {
            console.error("Error fetching user image", err);
            setUserImage(null);
          });
      } else {
        // If not valid email or empty, reset image
        setUserImage(null);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [emailValue]);
  // ✅✅✅ Modified useEffect ends here

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data.email, data.password);
      console.log("Login response:", res);
      if (res.success) {
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center p-6">
          {userImage ? (
            <img
              src={userImage}
              alt="User"
              className="rounded-full w-48 h-48 object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <p className="text-white text-lg font-semibold text-center">
              Enter your email to preview profile image
            </p>
          )}
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
