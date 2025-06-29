import React, { useEffect, useRef } from 'react';
import logo1 from '../assets/logo2.png';
import logo2 from '../assets/logo3.png';
import logo3 from '../assets/logo4.png';
import logo4 from '../assets/logo5.png';
import logo5 from '../assets/logo6.png';

const logos = [logo1, logo2, logo3, logo4, logo5];

const OurClient = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollAmount = 0;
    const itemWidth = 192; // 48 * 4 = Tailwind w-48 (in px)
    const totalScrollWidth = itemWidth * logos.length;

    const interval = setInterval(() => {
      if (!slider) return;

      scrollAmount += itemWidth;

      if (scrollAmount >= totalScrollWidth) {
        scrollAmount = 0;
        slider.scrollTo({ left: 0, behavior: 'auto' }); // snap back instantly
      } else {
        slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 4000); // every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4">
      <div>
        <h1 className="text-6xl font-semibold text-center mb-5">
          <span className="text-[#EC5598]">Our</span> Clients
        </h1>
        <div className="divider w-80 mx-auto"></div>
        <p className="max-w-3xl mx-auto text-center mb-10">
          We are proud to have worked with a diverse range of clients, delivering exceptional results and building lasting relationships.
        </p>
      </div>

      {/* Logo slider */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Duplicate for smooth looping */}
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 h-24 flex justify-center items-center p-4"
          >
            <img src={logo} alt={`client-${index}`} className="h-full object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurClient;
