import axios from 'axios';

const AxiosPublic = () => {
    const axiosPublic=axios.create({
        baseURL: 'https://salon-8j7i.vercel.app/api', // Replace with your API base URL
       
    })
    return axiosPublic;
};

export default AxiosPublic;