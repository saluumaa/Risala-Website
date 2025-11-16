import React,{useState, useEffect} from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../../../redux/NewsSlice';
import { FaUsers, FaBook, FaUserGraduate } from 'react-icons/fa';
import apiRequest from '../../../utils/apiRequest';


const Dashboard = () => {
  const dispatch = useDispatch();
  const [enrolledStudents, setEnrolledStudents] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
 const programsPosted = useSelector((state) => state.news.news);
  const [recentUsers, setRecentUsers] = useState([]);
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    fetchStudents();
    fetchUsers();
    dispatch(fetchNews());
  }, [dispatch]);


  // ✅ Get students from API and group by month
  const fetchStudents = async () => {
    try {
      const res = await apiRequest.get('/syp');
      setEnrolledStudents(res.data.length);

      const monthly = groupByMonth(res.data);
      setChartData(prev => mergeChartData(prev, monthly, 'students'));
    } catch (err) {
      console.error('Error fetching students', err);
    }
  };

  // ✅ Get users from API and group by month
  const fetchUsers = async () => {
    try {
      const res = await apiRequest.get('/users');
      setTotalUsers(res.data.length);
      setRecentUsers(res.data.slice(0, 5)); // Get the 5 most recent users
      // Group users by month
      const monthly = groupByMonth(res.data);
      setChartData(prev => mergeChartData(prev, monthly, 'users'));
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  // ✅ Step 1: Group any array of data by month
  const groupByMonth = (items) => {
    const result = {};
    items.forEach(item => {
      const date = new Date(item.createdAt); // get creation date
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // format "2025-03"
      result[month] = (result[month] || 0) + 1; // count items per month
    });
    return result;
  };

  // ✅ Step 2: Merge student+user counts into a single array
  const mergeChartData = (prev, newData, field) => {
    const keys = new Set([...prev.map(item => item.name), ...Object.keys(newData)]);

    return [...keys].map(key => {
      const existing = prev.find(item => item.name === key) || {};
      return {
        name: key, // example: "2025-04"
        ...existing,
        [field]: newData[key] || 0
      };
    }).sort((a, b) => new Date(a.name) - new Date(b.name)); // sort by month
  };


  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
          <FaUserGraduate className="text-4xl text-blue-500" />
          <div>
            <p className="text-lg font-semibold">Enrolled Students</p>
            <p className="text-2xl">
              {enrolledStudents}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
          <FaUsers className="text-4xl text-green-500" />
          <div>
            <p className="text-lg font-semibold">Total Users</p>
            <p className="text-2xl">
              {totalUsers}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 flex items-center space-x-4">
          <FaBook className="text-4xl text-yellow-500" />
          <div>
            <p className="text-lg font-semibold">Programs Posted</p>
            <p className="text-2xl">
              {programsPosted.length}
            </p>
          </div>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="bg-white rounded-xl shadow p-5 mt-10">
        <h2 className="text-xl font-semibold mb-4">Monthly Activity Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>


      {/* Recent data placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <ul className="space-y-2 text-gray-700">
            {recentUsers.map(user => (
              <li key={user._id} className="flex justify-between">
                <span>{user.username? user.username : 'Unknown User'}</span>

                <span className="text-sm text-gray-500">{user.email}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Recent News</h2>
          <ul className="space-y-2 text-gray-700">
            {programsPosted.slice(0, 5).map(program => (
              <li key={program._id} className="flex justify-between">
                <span>{program.title}</span>
                <span className="text-sm text-gray-500">{new Date(program.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
