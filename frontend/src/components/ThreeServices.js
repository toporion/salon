import React from 'react';
import BG1 from '../assets/bg-1.png';
import { SiTurkishairlines } from "react-icons/si";
import { BsScissors } from "react-icons/bs";
import { FaBrush } from "react-icons/fa";

const ThreeServices = () => {
    return (
        <div
            className="bg-cover bg-center bg-no-repeat py-16 sm:py-20"
            style={{ backgroundImage: `url(${BG1})` }}
        >
            <div className="max-w-6xl mx-auto text-center px-4">
                {/* Services Grid */}
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    <div className="bg-white/20 p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                        <div className="flex justify-center mb-4">
                            <SiTurkishairlines className='text-6xl sm:text-7xl md:text-8xl text-[#4B3941]' />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Hair Styling</h3>
                        <p className="text-sm sm:text-base">Professional cuts, styles, and transformations tailored to you.</p>
                    </div>

                    <div className="bg-white/20 p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                        <div className="flex justify-center mb-4">
                            <BsScissors className='text-6xl sm:text-7xl md:text-8xl bg-[#4B3941] rounded-full p-4 text-white' />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Facial Treatments</h3>
                        <p className="text-sm sm:text-base">Rejuvenate and glow with our customized skincare solutions.</p>
                    </div>

                    <div className="bg-white/20 p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                        <div className="flex justify-center mb-4">
                            <FaBrush className='text-6xl sm:text-7xl md:text-8xl bg-[#4B3941] rounded-full text-white p-4' />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Relaxing Massage</h3>
                        <p className="text-sm sm:text-base">Release tension and relax with our full-body massage therapy.</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row sm:justify-center items-center gap-4 sm:gap-10 mt-10'>
                    <button className='bg-[#EC5598] hover:bg-pink-600 py-3 px-6 text-base sm:text-lg font-semibold text-white rounded-sm transition-all'>
                        SEE OUR PLANS
                    </button>
                    <button className='bg-[rgb(88,72,80)] hover:bg-[#4B3941] py-3 px-6 text-base sm:text-lg font-semibold text-white rounded-sm transition-all'>
                        MORE DETAILS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThreeServices;
