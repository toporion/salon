import React, { useContext, useState } from 'react';
import { FaTachometerAlt, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt, FaAngleDown, FaAngleUp, FaMoneyCheckAlt, FaTasks } from 'react-icons/fa';
import { FaScissors, FaUsersViewfinder } from 'react-icons/fa6';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const rolePermissions = {
  admin: ['dashboard', 'users', 'services', 'appointments', 'clients', 'staff'],
  staff: ['appointments', 'total-task', 'total-payment'],
  user: ['Message', 'Booking', 'total-payment'],
};

const SideBar = () => {
  const { logOutUser, isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAppointmentsOpen, setIsAppointmentsOpen] = useState(false);
  // const [isClientsOpen, setIsClientsOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleLogOut = () => {
    logOutUser();
    navigate('/login');
  };

  const hasAccess = (permission) => {
    return user?.role && rolePermissions[user.role]?.includes(permission);
  };

  if (!user) return <div className="text-white p-4">Loading menu...</div>;

  return (
    <div className="w-56 min-h-screen bg-gray-800 text-white flex flex-col fixed left-0 top-0 shadow-lg">
      <div className="text-xl font-bold py-6 text-center border-b border-gray-700 tracking-wide">
        Salon Admin
      </div>

      <nav className="flex-1 flex flex-col mt-6">

        {/* Dashboard */}
        {hasAccess('dashboard') && (
          <a
            href="/admin"
            className="flex items-center gap-3 px-8 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <FaTachometerAlt className="text-lg" />
            <span>Dashboard</span>
          </a>
        )}
        {/* Users */}
        {hasAccess('users') && (
          <a
            href="/admin/users"
            className="flex items-center gap-3 px-8 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <FaUsersViewfinder className="text-lg" />
            <span>Users</span>
          </a>
        )}

        {/* Services */}
        {hasAccess('services') && (
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
                <a href="/admin/allServices" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">All Services</a>
                <a href="/admin/services" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">Add Service</a>
              </div>
            )}
          </div>
        )}

        {/* Appointments (admin or staff) */}
        {(user?.role === 'admin' || user?.role === 'staff') && (
          <div className="px-8">
            <button
              onClick={() => setIsAppointmentsOpen(!isAppointmentsOpen)}
              className="w-full flex items-center gap-3 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
            >
              <FaCalendarAlt className="text-lg" />
              <span className="flex-1 text-left">Bookings</span>
              {isAppointmentsOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>

            {isAppointmentsOpen && (
              <div className="ml-6 mt-1 flex flex-col gap-1 text-sm">
                {user?.role === 'admin' ? (
                  <a href="/admin/allBooking" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">
                    Manage Appointments
                  </a>
                ) : user?.role === 'staff' ? (
                  <a href="/admin/allBooking" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">
                    View Appointments
                  </a>
                ) : null}
              </div>
            )}
          </div>
        )}


        {/* Total Task (staff only) */}
        {hasAccess('total-task') && (
          <a
            href="/admin/total-tasks"
            className="flex items-center gap-3 px-8 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <FaTasks className="text-lg" />
            <span>Total Task</span>
          </a>
        )}

        {/* Total Payment (staff only) */}
        {hasAccess('total-payment') && (
          <a
            href="/admin/total-payment"
            className="flex items-center gap-3 px-8 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <FaMoneyCheckAlt className="text-lg" />
            <span>Total Payment</span>
          </a>
        )}

        {/* Clients
        {hasAccess('clients') && (
          <div className="px-8">
            <button
              onClick={() => setIsClientsOpen(!isClientsOpen)}
              className="w-full flex items-center gap-3 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
            >
              <FaUsers className="text-lg" />
              <span className="flex-1 text-left">Clients</span>
              {isClientsOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            {isClientsOpen && (
              <div className="ml-6 mt-1 flex flex-col gap-1 text-sm">
                <a href="/clients" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">All Clients</a>
                <a href="/clients/new" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">Add Client</a>
              </div>
            )}
          </div>
        )} */}

        {/* Staff */}
        {hasAccess('staff') && (
          <div className="px-8">
            <button
              onClick={() => setIsStaffOpen(!isStaffOpen)}
              className="w-full flex items-center gap-3 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
            >
              <FaCog className="text-lg" />
              <span className="flex-1 text-left">Staff</span>
              {isStaffOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            {isStaffOpen && (
              <div className="ml-6 mt-1 flex flex-col gap-1 text-sm">
                <a href="/admin/allStaff" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">All Staff</a>
                <a href="/admin/addStaff" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">Add Staff</a>
              </div>
            )}
          </div>


        )}

        {hasAccess('Booking') && (
          <div className="px-8">
            <button
              onClick={() => setIsUserOpen(!isUserOpen)}
              className="w-full flex items-center gap-3 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
            >
              <FaCalendarAlt className="text-lg" />
              <span className="flex-1 text-left">Booking</span>
              {isUserOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            {isUserOpen && (
              <div className="ml-6 mt-1 flex flex-col gap-1 text-sm">
                <a href="/booking/myBookings" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">My Bookings</a>
                <a href="/booking/new" className="text-gray-300 hover:text-white py-1 px-2 hover:bg-gray-700 rounded">New Booking</a>
              </div>
            )}
          </div>
        )}

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
