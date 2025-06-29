import React from 'react';
import Slider from 'react-slick';
import buyer1 from '../assets/pic2 (1).jpg';
import buyer2 from '../assets/pic1 (1).jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Dummy review data
const reviews = [
    {
        id: 1,
        name: 'Jane Doe',
        text: 'Amazing service! Highly recommend to anyone looking for quality.',
        image: buyer1
    },
    {
        id: 2,
        name: 'John Smith',
        text: 'Exceptional experience and great support throughout the process.',
        image: buyer2
    },

];

const WhatPeopleSay = () => {
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className='mt-20 px-4'>
            {/* Section Title */}
            <div>
                <h1 className="text-6xl font-semibold text-center mb-5">
                    <span className='text-[#EC5598]'>What</span> People Say
                </h1>
                <div className="divider w-80 mx-auto"></div>
                <p className="max-w-3xl mx-auto text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit elit turpis,
                    a porttitor tellus sollicitudin at.
                </p>
            </div>

            {/* Review Slider */}
            <div className="mt-16 max-w-6xl mx-auto">
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <div key={review.id} className="px-12">
                            {/* Review Card */}
                            <div className="relative bg-slate-500 rounded-2xl p-8 mt-14 min-h-[250px] flex items-center justify-center text-center">
                                
                                {/* Reviewer Image (half outside the card, left-middle) */}
                                <div className="absolute -left-14 top-1/2 -translate-y-1/2">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
                                    />
                                </div>

                                {/* Review Text Content */}
                                <div className="ml-20">
                                    <p className="text-gray-700 mb-4 italic">"{review.text}"</p>
                                    <h3 className="font-bold text-[#EC5598]">{review.name}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default WhatPeopleSay;
