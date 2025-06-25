import React from 'react';
import { IoIosLeaf } from "react-icons/io";
const Welecome = () => {
    return (
        <div className='mt-20 px-4 md:px-8 lg:px-16'>
            <div className='max-w-6xl mx-auto text-center '>
                <p className='text-5xl font-semibold'>Welcome to spa center</p>
                <div className="flex w-1/2 mx-auto flex-col">

                    <div className="divider"><IoIosLeaf className='text-3xl' /></div>

                </div>
                <p className='mb-14'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit elit turpis, a porttitor tellus sollicitudin at.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </p>
                <p className=''>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining unchanged. It was popularised in the 1960s with the release Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley. 
                </p>
            </div>
        </div>
    );
};

export default Welecome;