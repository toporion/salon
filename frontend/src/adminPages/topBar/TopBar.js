import React from 'react';

const TopBar = ({ onMobileMenuClick }) => (
  <header className="w-full bg-gray-900 text-white flex items-center h-12 shadow-md fixed top-0 left-0 md:left-56 z-40">
    
    {/* Hamburger Icon - Only on small screens */}
    <button 
      className="md:hidden px-4 text-2xl focus:outline-none" 
      onClick={onMobileMenuClick}
    >
      &#9776; {/* Unicode for ☰ */}
    </button>

    {/* WP Logo */}
    <div className="flex items-center px-4">
      <svg
        className="w-7 h-7 mr-2"
        viewBox="0 0 32 32"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="16" fill="#23282d" />
        <path
          d="M16 4C9.373 4 4 9.373 4 16c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.627-5.373-12-12-12zm0 22c-5.523 0-10-4.477-10-10 0-5.523 4.477-10 10-10s10 4.477 10 10c0 5.523-4.477 10-10 10zm0-18a8 8 0 100 16 8 8 0 000-16z"
          fill="#fff"
        />
      </svg>
      <span className="font-semibold text-lg tracking-tight">My WordPress</span>
    </div>

    <div className="flex-1"></div>

    {/* Avatar & Dropdown */}
    <div className="relative flex items-center px-4 space-x-4 group">
      <button className="hover:bg-gray-800 px-3 py-1 rounded transition">
        Howdy, Admin
      </button>
      <img
        src="https://www.gravatar.com/avatar/?d=mp"
        alt="User"
        className="w-8 h-8 rounded-full border border-gray-700 cursor-pointer"
      />

      {/* Dropdown */}
      <div className="absolute right-4 top-12 bg-white text-black shadow-lg rounded w-48 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
        <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
      </div>
    </div>
  </header>
);

export default TopBar;
