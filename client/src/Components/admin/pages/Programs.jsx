
import React, { useEffect, useState } from 'react';
import apiRequest from '../../../utils/apiRequest';
import { Link } from 'react-router-dom';

const Programs = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const res = await apiRequest.get('/news');
    setPrograms(res.data);
  };

  const handleDelete = async (id) => {
    await apiRequest.delete(`/news/${id}`);
    fetchPrograms();
  };

  return (
    <div className="space-y-6">
       <div className="actions p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold text-bodyColor mb-4">
              Manage Content
            </h2>
            <div className="flex space-x-4">
              <Link
               to='/addnews'
                className="bg-green-500  text-lg px-16 py-2 rounded hover:bg-green-600"
              >
                Add News
              </Link>
            </div>
          </div>
      <h1 className="text-2xl font-bold text-gray-800">Manage Programs</h1>
      <table className="min-w-full table-auto bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {programs.map(news => (
            <tr key={news._id} className=" border-b">
              <td className="py-2 px-4">{news.title}</td>
              <td className="py-2 px-4">{new Date(news.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4">
                <button onClick={() => handleDelete(news._id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Programs;
