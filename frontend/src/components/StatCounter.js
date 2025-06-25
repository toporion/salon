import React from 'react';
import bgImage from '../assets/bg-9.jpg';
import CountUp from 'react-countup';
import { FaUsers, FaAward, FaBriefcase, FaSmile } from 'react-icons/fa';

const stats = [
  { title: 'Happy Clients', icon: <FaSmile className="text-3xl text-white mr-3" />, value: 1200 },
  { title: 'Awards Won', icon: <FaAward className="text-3xl text-white mr-3" />, value: 15 },
  { title: 'Projects Done', icon: <FaBriefcase className="text-3xl text-white mr-3" />, value: 320 },
  { title: 'Active Clients', icon: <FaUsers className="text-3xl text-white mr-3" />, value: 85 },
];

const StatCounter = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat mt-20 mb-"
      style={{
        backgroundImage: `url(${bgImage})`,
        height: '280px',
      }}
    >
      {/* Pink Overlay */}
      <div className="absolute inset-0 bg-[#EC5598]/70"></div>

      {/* Stat Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-6xl w-full px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-white">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center justify-start md:justify-center"
            >
              {stat.icon}
              <div className="text-left">
                <h2 className="text-5xl font-bold leading-none">
                  <CountUp end={stat.value} duration={3} />
                </h2>
                <p className="mt-1 text-base">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCounter;
