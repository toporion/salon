import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosSecure from '../../hook/AxiosSecure';

const Users = () => {
  const axiosSecure = AxiosSecure();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/allUsers');
      return res.data.data;
    }
  });




  const handleDelete = (id) => {
    axiosSecure.delete(`/deleteUser/${id}`)
  };

  const handleChangeRole =async (id, role) => {
    const res= axiosSecure.patch(`/make-role/${id}`,{role})
    alert('role change successfully')
    console.log(res.role)
  };

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      {/* 🧠 Make table horizontally scrollable on mobile */}
      <div className="w-full ">
        <table className=" w-full table-auto border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Profile</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Change Role</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm text-white">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === 'admin'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                      }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <select
                    className="border px-2 py-1 rounded"
                    value={user.role}
                    onChange={(e) =>
                      handleChangeRole(user._id, e.target.value)
                    }
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Users;
