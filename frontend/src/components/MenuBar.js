import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FaBars, FaCartPlus, FaTimes } from 'react-icons/fa';
import UseAuth from '../hook/UseAuth';

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {isAuthenticated,logOutUser}=UseAuth()
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut=()=>{
        logOutUser()
    }

    return (
        <div className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
                {/* Logo */}
                <div>
                    <img src={logo} alt="Logo" className="w-32 md:w-40" />
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6 text-sm md:text-base">
                        <li><a href="/" className="text-gray-700 hover:text-[#EC5598]">Home</a></li>
                        <li><a href="/show-services" className="text-gray-700 hover:text-[#EC5598]">Services</a></li>
                        <li><a href="/about" className="text-gray-700 hover:text-[#EC5598]">About Us</a></li>
                        <li><a href="/contact" className="text-gray-700 hover:text-[#EC5598]">Contact</a></li>
                        {
                            isAuthenticated ? <><li><button onClick={handleLogOut}>Logout</button></li></>:
                            <>
                            <li><a href="/login" className="text-gray-700 hover:text-[#EC5598]">Login</a></li>
                            </>
                        }
                     
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-2xl text-gray-700">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-6 pb-4">
                    <ul className="flex flex-col space-y-3 text-base">
                        <li><a href="/" className="text-gray-700 hover:text-[#EC5598]">Home</a></li>
                        <li><a href="/services" className="text-gray-700 hover:text-[#EC5598]">Services</a></li>
                        <li><a href="/about" className="text-gray-700 hover:text-[#EC5598]">About Us</a></li>
                        <li><a href="/contact" className="text-gray-700 hover:text-[#EC5598]">Contact</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MenuBar;
