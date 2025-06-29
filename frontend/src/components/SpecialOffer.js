import React from 'react';
import special from '../assets/special-offer.jpg';

const SpecialOffer = () => {
    return (
        <div className="relative h-[500px] w-full overflow-hidden">
            {/* Image behind */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0">
                <img
                    src={special}
                    alt="Special Offer"
                    className="w-[1000px] h-[500px] object-cover shadow-xl"
                />
            </div>

            {/* Pink area with layered inner shading */}
            <div
                className="relative z-10 w-3/5 h-full bg-[#f85ca2] rounded-r-full flex flex-col justify-center px-10 border-r-8 border-slate-400"
                style={{
                    boxShadow: `
                    inset -10px 0 0 0 rgba(255, 210, 230, 0.7) 
                    inset -20px 0 0 0 rgba(190, 60, 110, 0.5),   
`

                }}
            >
                <div className='w-1/2 mx-auto'>
                    <h2 className="text-6xl font-bold text-white mb-4">Our Special Offer</h2>
                    <p className=" text-white text-3xl ">
                        You owe yourself this moment. Don’t miss our limited-time deals!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SpecialOffer;
