import React from 'react';
import bg2 from '../assets/bg-6.jpg';
import { IoIosLeaf } from "react-icons/io";
import faceImg from '../assets/pic1.jpg';
import faceImg1 from '../assets/pic2.jpg';
import faceImg2 from '../assets/pic3.jpg';
import faceImg3 from '../assets/pic5.jpg';

const Services = () => {
    const images = [faceImg, faceImg1, faceImg2, faceImg3];
    const titles = ["Face Massage", "Body Massage", "Back Massage", "Foot Massage"];

    // Fixed offset styles to always stay inside the pink base
    const offsets = [
        { white: "left-4 top-4", img: "left-8 top-12" },   // right touch feel
        { white: "left-4 top-4", img: "left-4 top-12" },  // left touch feel
        { white: "left-4 top-4", img: "left-12 top-12" }, // bottom touch feel
        { white: "left-4 top-4", img: "left-12 top-4" },  // top touch feel
    ];

    return (
        <div className="bg-center bg-repeat py-20"
            style={{ backgroundImage: `url(${bg2})` }}>
            <div>
                <h1 className="text-6xl font-semibold text-center mb-5">
                    <span className='text-[#EC5598]'>Services</span> For You
                </h1>
                <div className="divider w-80 mx-auto"><IoIosLeaf className='text-5xl' /></div>
                <p className="max-w-3xl mx-auto text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit elit turpis, 
                    a porttitor tellus sollicitudin at. Class aptent taciti sociosqu ad litora torquent 
                    per conubia nostra, per inceptos himenaeos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto mt-10 px-4">
                {images.map((img, index) => (
                    <div key={index} className=" p-6 rounded-lg transition-all">
                        <div className="relative w-72 h-72 mx-auto mb-8">
                            {/* Pink background circle */}
                            <div className="absolute w-72 h-72 rounded-full bg-[#EC5598] top-0 left-0 z-0"></div>

                            {/* White circle inside pink */}
                            <div className={`absolute w-64 h-64 rounded-full bg-white ${offsets[index].white} z-10 shadow-md`}></div>

                            {/* Image inside white */}
                            <img
                                src={img}
                                alt={titles[index]}
                                className={`absolute w-56 h-56 rounded-full object-cover ${offsets[index].img} z-20 shadow-xl`}
                            />
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{titles[index]}</h3>
                     
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
