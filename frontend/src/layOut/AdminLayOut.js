import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../adminPages/sideBar/SideBar';
import TopBar from '../adminPages/topBar/TopBar';

const AdminLayOut = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      
      {/* Sidebar: Hidden on small screens, visible on md+ */}
      <div
        className={`fixed z-40 md:static top-0 left-0 h-full transition-transform duration-300 
        bg-white shadow-lg w-56 
        ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0`}
      >
        <SideBar />
      </div>

      {/* Overlay for mobile */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        <TopBar onMobileMenuClick={() => setShowMobileSidebar(!showMobileSidebar)} />

        <main className="mt-16 px-4 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayOut;
