import React from 'react';
import img1 from '../assets/pic1.jpg';
import img2 from '../assets/pic2.jpg';
import img3 from '../assets/pic3.jpg';
import img4 from '../assets/pic5.jpg';
import img5 from '../assets/pic6.jpg';
import img6 from '../assets/pic7.jpg';

const images = [
  { src: img1, title: 'Spa Treatment', desc: 'Relaxing spa experience' },
  { src: img2, title: 'Body Massage', desc: 'Therapeutic full-body massage' },
  { src: img3, title: 'Facial Care', desc: 'Rejuvenating skin treatment' },
  { src: img4, title: 'Hair Styling', desc: 'Trendy cuts & styling' },
  { src: img5, title: 'Manicure', desc: 'Nail care and art' },
  { src: img6, title: 'Pedicure', desc: 'Relaxing foot care' },
];

const OurGallery = () => {
  return (
    <div className="mt-20 px-4">
      <div>
        <h1 className="text-6xl font-semibold text-center mb-5">
          <span className="text-[#EC5598]">Our</span> Gallery
        </h1>
        <p className="max-w-3xl mx-auto text-center mb-10">
          Explore our gallery to see the relaxing and rejuvenating experiences we offer.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {images.map((item, index) => (
          <div
            key={index}
            className="w-full h-64 relative group"
            style={{ perspective: '1000px' }}
          >
            <div
              className="w-full h-full transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s',
              }}
              // Add the flipping effect on hover
            >
              <div
                className="absolute w-full h-full"
                style={{
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl shadow-md"
                />
              </div>
              <div
                className="absolute w-full h-full bg-[#EC5598] text-white rounded-xl p-4 flex flex-col justify-center items-center text-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="mt-2">{item.desc}</p>
              </div>
            </div>

            {/* Overlay div to handle hover and flip */}
            <style jsx>{`
              .group:hover > div {
                transform: rotateY(180deg);
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurGallery;
