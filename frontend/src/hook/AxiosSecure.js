import axios from 'axios';
import React from 'react';

const AxiosSecure = () => {
    const axiosSecure = axios.create({
        baseURL: 'https://salon-8j7i.vercel.app/api', // Replace with your API base URL

    })
    // Add a request interceptor
    axiosSecure.interceptors.request.use(function (config) {
        // Do something before request is sent
        const token=localStorage.getItem('token')
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default AxiosSecure;