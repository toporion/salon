import React from 'react';
import about from '../../assets/slide2.jpg';
import ceo from '../../assets/ex1.jpg';

const About = () => {
    return (
        <div>
            {/* Full Width Hero Section */}
            <div className="relative w-full h-72 md:h-96">
                <img src={about} alt="About Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h2 className="text-white text-4xl md:text-5xl font-bold uppercase tracking-wider">About Us</h2>
                </div>
            </div>

            {/* Main Content - Max Width */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div>
                        <img src={ceo} alt="CEO or Salon" className="rounded-2xl shadow-lg" />
                    </div>

                    {/* Text Content */}
                    <div>
                        <h3 className="text-3xl font-bold text-pink-600 mb-4">Welcome to Our Salon</h3>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            At our salon, beauty meets expertise. We are passionate about making you look and feel your best.
                            Whether it's a fresh haircut, vibrant color, or relaxing facial, our professional team is here
                            to provide an unforgettable experience.
                        </p>
                        <p className="mt-4 text-gray-600">
                            From humble beginnings to becoming a trusted name in beauty, we’ve grown through dedication,
                            creativity, and a love for transformation. Come visit us and discover the difference.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
