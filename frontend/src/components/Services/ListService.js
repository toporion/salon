import React from 'react';
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../../hook/AxiosPublic';
import ServiceCard from './ServiceCard';

const ListService = () => {
  const axiosPublic = AxiosPublic();
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axiosPublic.get('/allServices');
      return res.data.data.allServices;
    },
  });

  if (isLoading) return <p>Loading services...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {services.map(service => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default ListService;
