import React from 'react';
import bg2 from '../assets/bg-6.jpg';
import { IoIosLeaf } from "react-icons/io";
import faceImg from '../assets/ex1.jpg';
import faceImg1 from '../assets/ex2.jpg';
import faceImg2 from '../assets/ex3.jpg';


const Experts = () => {

    const images = [faceImg, faceImg1, faceImg2];
    const titles = ["Camilia", "Milagroas", "Agustina", "Foot Massage"];

    // Fixed offset styles to always stay inside the pink base
    const offsets = [
        { white: "left-4 top-4", img: "left-8 top-7" },   // right touch feel
        { white: "left-4 top-4", img: "left-4 top-4" },  // left touch feel
        { white: "left-4 top-4", img: "left-6 top-8" }, // bottom touch feel

    ];


    return (
        <div className="bg-center bg-repeat py-20"
            style={{ backgroundImage: `url(${bg2})` }}>
            <div>
                <h1 className="text-6xl font-semibold text-center mb-5">
                    <span className='text-[#EC5598]'>Our</span> Experts
                </h1>
                <div className="divider w-80 mx-auto"><IoIosLeaf className='text-5xl' /></div>
                <p className="max-w-3xl mx-auto text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit elit turpis,
                    a porttitor tellus sollicitudin at. Class aptent taciti sociosqu ad litora torquent
                    per conubia nostra, per inceptos himenaeos.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mt-10 px-4 max-w-7xl mx-auto">
                {images.map((img, index) => (
                    <div key={index} className="group p-6 rounded-lg transition-all">
                        <div className="relative w-72 h-72 mx-auto mb-8">
                            {/* Pink background circle */}
                            <div className="absolute w-72 h-72 rounded-full bg-[#EC5598] top-0 left-0 z-0"></div>

                            {/* White circle - animate on hover */}
                            <div
                                className={`absolute w-64 h-64 rounded-full bg-white ${offsets[index].white} z-10 shadow-md transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:translate-x-2`}
                            ></div>

                            {/* Image inside white */}
                            <img
                                src={img}
                                alt={titles[index]}
                                className={`absolute w-60 h-60 rounded-full object-cover ${offsets[index].img} z-20 shadow-xl`}
                            />
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 text-center">{titles[index]}</h3>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Experts;
