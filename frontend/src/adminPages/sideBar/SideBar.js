import React, { useContext, useState } from 'react';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaAngleDown,
  FaAngleUp,
} from 'react-icons/fa';
import { FaScissors, FaUsersViewfinder } from 'react-icons/fa6';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', icon: <FaTachometerAlt />, href: '/admin' },
  { label: 'Appointments', icon: <FaCalendarAlt />, href: '/appointments' },
  // 'Services' will be handled separately
  { label: 'Clients', icon: <FaUsers />, href: '/clients' },
  { label: 'Users', icon: <FaUsersViewfinder />, href: '/admin/users' },
];

const SideBar = () => {
  const { logOutUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleLogOut = () => {
    logOutUser();
    navigate('/login');
  };

  return (
    <div className="w-56 min-h-screen bg-gray-800 text-white flex flex-col fixed left-0 top-0 shadow-lg">
      <div className="text-xl font-bold py-6 text-center border-b border-gray-700 tracking-wide">
        Salon Admin
      </div>
      <nav className="flex-1 flex flex-col mt-6">

        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-8 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}

        {/* Services Dropdown */}
        <div className="px-8">
          <button
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            className="w-full flex items-center gap-3 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <FaScissors className="text-lg" />
            <span className="flex-1 text-left">Services</span>
            {isServicesOpen ? <FaAngleUp /> : <FaAngleDown />}
          </button>

          {isServicesOpen && (
            <div className="ml-6 mt-1 flex flex-col gap-1 text-sm">
              <a
                href="/admin/allServices"
                className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded"
              >
                All Services
              </a>
              <a
                href="/admin/services"
                className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded"
              >
                Add Service
              </a>
            </div>
          )}
        </div>
      </nav>

      <div className="py-6 border-t border-gray-700 text-center">
        <button
          onClick={handleLogOut}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded transition-colors w-full"
        >
          <FaSignOutAlt className="text-lg" />
          {isAuthenticated === true ? <>LogOut</> : ''}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
