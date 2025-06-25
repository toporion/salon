import React from 'react';
import {
  FaFacebook, FaInstagram, FaLinkedin,
  FaPinterest, FaTwitter, FaYoutube
} from 'react-icons/fa';
import { MdMarkEmailRead, MdCall } from "react-icons/md";

const TopBar = () => {
  return (
    <div className="bg-[#EC5598] text-white text-sm py-1">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        
        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center sm:text-left">
          <p className="flex items-center gap-1"><MdMarkEmailRead /> admin@salon.com</p>
          <p className="flex items-center gap-1"><MdCall /> +100 152 225</p>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 mt-1 md:mt-0">
          {[FaFacebook, FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaPinterest].map((Icon, i) => (
            <Icon key={i} className="bg-pink-500 hover:bg-pink-600 text-white text-xl p-1 rounded-full transition duration-300" />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default TopBar;
