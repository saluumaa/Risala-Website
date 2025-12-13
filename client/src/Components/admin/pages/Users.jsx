import { useEffect, useState } from 'react';
import apiRequest from '../../../utils/apiRequest';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await apiRequest.get('/users');
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await apiRequest.delete(`/users/${id}`);
    fetchUsers(); // Refresh
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
      <table className="min-w-full table-auto bg-gray-100 shadow-md rounded-xl overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-4">{user.username || 'No Name'}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
