import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { selectUser, logout } from '../../../redux/UsersSlice';
import apiRequest from '../../../utils/apiRequest';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend
} from 'recharts';

const SummerProgram = () => {
  const currentUser = useSelector(selectUser) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [isRegistrationActive, setIsRegistrationActive] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [areaGenderChartData, setAreaGenderChartData] = useState([]);


  // Fetch registration status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await apiRequest.get('/syp/status');
        setIsRegistrationActive(response.data.isActive);
      } catch (error) {
        console.error('Error fetching registration status:', error);
      }
    };
    fetchStatus();
  }, []);

  // Toggle registration status
  const handleToggle = async () => {
    try {
      const newStatus = !isRegistrationActive;
      await apiRequest.patch('/syp/activate', { isActive: newStatus });
      setIsRegistrationActive(newStatus);
    } catch (error) {
      console.error('Error toggling registration status:', error);
    }
  };

  // Group students by month
  const groupByMonth = (items) => {
    const counts = {};
    items.forEach(item => {
      const date = new Date(item.createdAt);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      counts[month] = (counts[month] || 0) + 1;
    });

    return Object.entries(counts).map(([month, count]) => ({
      month,
      students: count
    }));
  };

  // Group students by Area and gender
  const groupByAreaAndGender = (students) => {
  const result = {};

  students.forEach(student => {
    const area = student.area || "Unknown";
    const gender = student.gender === "male" ? "Male" : "Female"; 

    if (!result[area]) {
      result[area] = { area, Male: 0, Female: 0 };
    }

    result[area][gender] += 1;
  });

  return Object.values(result);
};


  // Fetch students and prepare chart data
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      const fetchStudents = async () => {
        try {
          const response = await apiRequest.get('/syp');
          const students = response.data;
          setRegisteredStudents(students);
          setChartData(groupByMonth(students));
          setAreaGenderChartData(groupByAreaAndGender(students));
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
      fetchStudents();
    }
  }, [currentUser]);

// console.log('Registered Students:', registeredStudents);
  return (
    <div className=" mt-14 mx-auto p-6  text-gray-800 ">
      {/* Registration Status */}
      {currentUser?.role === 'admin' && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold">
            Registration Status:{" "}
            <span className={isRegistrationActive ? "text-green-600" : "text-red-600"}>
              {isRegistrationActive ? 'Active' : 'Inactive'}
            </span>
          </h3>
          <button
            className={`mt-2 px-4 py-2 rounded text-white ${
              isRegistrationActive ? 'bg-red-500' : 'bg-green-600'
            }`}
            onClick={handleToggle}
          >
            {isRegistrationActive ? 'Deactivate Registration' : 'Activate Registration'}
          </button>
        </div>
      )}

      {/* Admin Section */}
      {currentUser?.role === 'admin' && (
        <div className="space-y-10">
          {/* Registered Students Table */}
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Registered Students
            </h2>
            {registeredStudents?.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300 text-sm overflow-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Age</th>
                    <th className="border border-gray-300 px-4 py-2">Telephone</th>
                    <th className="border border-gray-300 px-4 py-2">School</th>
                    <th className="border border-gray-300 px-4 py-2">Area</th>
                     <th className="border border-gray-300 px-4 py-2">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredStudents.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">{student.participantName}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.age}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.telephoneNo}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.school}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.area}</td>
                      <td className="border border-gray-300 px-4 py-2">{student.gender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No registered students found.</p>
            )}
          </div>

          {/* Bar Chart */}
          <div className='flex flex-col gap-4 mb-4'>
            <div className="bg-white p-4 rounded shadow ">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Student Registration Overview
              </h2>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500">No data available for chart.</p>
              )}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                Students by Area & Gender
              </h2>
              {areaGenderChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={areaGenderChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="area" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Male" stackId="a" fill="#60a5fa" />
                    <Bar dataKey="Female" stackId="a" fill="#f472b6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500">No area/gender data available.</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SummerProgram;
