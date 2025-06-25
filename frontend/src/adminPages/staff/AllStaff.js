import React, { useEffect, useState } from 'react';
import AxiosSecure from '../../hook/AxiosSecure'; // your secure axios hook
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllStaff = () => {
  const axiosSecure = AxiosSecure();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axiosSecure.get('/get-staff');
        setStaffList(res.data.data || []);
      } catch (err) {
        console.error('Error fetching staff:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, [axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Staff Members</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm text-gray-700">
                <th className="px-4 py-2 border">Photo</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Services</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff._id} className="border-t hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 border">
                    <img
                      src={staff.image}
                      alt={staff.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 border">{staff.name}</td>
                  <td className="px-4 py-2 border capitalize">{staff.role}</td>
                  <td className="px-4 py-2 border">{staff.contact}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        staff.active ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {staff.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {(staff.services || []).map((svc) => svc.name).join(', ') || '-'}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                   <Link to={`/admin/updateStaff/${staff._id}`}>
                    <button className="text-blue-600 hover:text-blue-800" title="Edit">
                      <FaEdit />
                    </button>
                   </Link>
                    <button className="text-red-600 hover:text-red-800" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {staffList.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllStaff;
