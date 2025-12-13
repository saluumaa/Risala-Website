// Charts.jsx
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import apiRequest from '../../../utils/apiRequest';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

const COLORS = ['#8884d8', '#82ca9d'];

const Charts = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [chartType, setChartType] = useState('line');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const [monthlyData, setMonthlyData] = useState([]);
  const [genderAreaData, setGenderAreaData] = useState([]);
  const [genderDistribution, setGenderDistribution] = useState([]);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    try {
      const [userRes, studentRes, programmeRes] = await Promise.all([
        apiRequest.get('/users'),
        apiRequest.get('/syp'),
        apiRequest.get('/news')
      ]);

      const filteredUsers = filterByDate(userRes.data);
      const filteredStudents = filterByDate(studentRes.data);

      setUsers(filteredUsers);
      setStudents(filteredStudents);
      setProgrammes(programmeRes.data);

      setMonthlyData(getMonthlyData(filteredUsers, filteredStudents));
      setGenderAreaData(groupByAreaAndGender(filteredStudents));
      setGenderDistribution(getGenderDistribution(filteredStudents));
    } catch (err) {
      console.error('Error fetching chart data', err);
    }
  };

  const filterByDate = (data) => {
    if (!dateRange.from || !dateRange.to) return data;
    const from = new Date(dateRange.from);
    const to = new Date(dateRange.to);
    return data.filter(item => {
      const created = new Date(item.createdAt);
      return created >= from && created <= to;
    });
  };

  const getMonthlyData = (users, students) => {
    const allMonths = {};

    const group = (items, field) => {
      items.forEach(item => {
        const date = new Date(item.createdAt);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        allMonths[key] = allMonths[key] || { name: key, users: 0, students: 0 };
        allMonths[key][field]++;
      });
    };

    group(users, 'users');
    group(students, 'students');

    return Object.values(allMonths).sort((a, b) => new Date(a.name) - new Date(b.name));
  };

  const groupByAreaAndGender = (students) => {
    const result = {};
    students.forEach(student => {
      const area = student.area || 'Unknown';
      const gender = student.gender?.toLowerCase() === 'male' ? 'Male' : 'Female';
      if (!result[area]) result[area] = { area, Male: 0, Female: 0 };
      result[area][gender]++;
    });
    return Object.values(result);
  };

  const getGenderDistribution = (students) => {
    let male = 0, female = 0;
    students.forEach(s => {
      const g = s.gender?.toLowerCase();
      if (g === 'male') male++;
      else female++;
    });
    return [
      { name: 'Male', value: male },
      { name: 'Female', value: female }
    ];
  };

  const handleCSVDownload = () => {
    const csvContent = [
      ['Month', 'Users', 'Students'],
      ...monthlyData.map(d => [d.name, d.users, d.students])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'monthly_report.csv');
  };

  return (
    <div className="p-6 space-y-10 bg-bodyBackground min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary mb-6">Analytics Dashboard</h1>
        <button onClick={handleCSVDownload} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow">Download CSV</button>
      </div>

      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={dateRange.from}
          onChange={e => setDateRange(prev => ({ ...prev, from: e.target.value }))}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={dateRange.to}
          onChange={e => setDateRange(prev => ({ ...prev, to: e.target.value }))}
          className="p-2 border rounded"
        />
        <select
          value={chartType}
          onChange={e => setChartType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="pie">Pie</option>
        </select>
      </div>

      {/* Dynamic Chart */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Student & User Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'line' && (
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="students" stroke="#8884d8" animationDuration={700} />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" animationDuration={700} />
            </LineChart>
          )}
          {chartType === 'bar' && (
            <BarChart data={genderAreaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="area" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Male" fill="#8884d8" />
              <Bar dataKey="Female" fill="#ff69b4" />
            </BarChart>
          )}
          {chartType === 'pie' && (
            <PieChart>
              <Pie
                data={genderDistribution}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {genderDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
