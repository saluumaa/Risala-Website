import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaNewspaper, FaCalendarCheck, FaClipboardList } from 'react-icons/fa';
import apiRequest from '../../utils/apiRequest';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        news: 0,
        registrations: 0,
        activeProgramme: false
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch users count
                const usersRes = await apiRequest.get('/users');

                // Fetch news count
                const newsRes = await apiRequest.get('/news');

                // Fetch registrations count
                const regRes = await apiRequest.get('/syp');

                // Fetch programme status
                const progRes = await apiRequest.get('/programme/settings');

                setStats({
                    users: usersRes.data.length,
                    news: newsRes.data.length,
                    registrations: regRes.data.length,
                    activeProgramme: progRes.data.isActive
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total News', value: stats.news, icon: <FaNewspaper />, color: 'bg-blue-500' },
        { title: 'Registrations', value: stats.registrations, icon: <FaUsers />, color: 'bg-green-500' },
        { title: 'Programme Status', value: stats.activeProgramme ? 'Active' : 'Inactive', icon: <FaCalendarCheck />, color: stats.activeProgramme ? 'bg-green-600' : 'bg-red-500' },
        { title: 'Total Users', value: stats.users, icon: <FaUsers />, color: 'bg-purple-500' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center transition-transform hover:scale-105">
                        <div className={`p-4 rounded-lg ${card.color} text-white mr-4 shadow-lg`}>
                            <span className="text-2xl">{card.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{card.title}</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/admin/news" className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left">
                            <span className="block text-primary-600 dark:text-primary-400 font-bold mb-1">Add News</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Create a new article</span>
                        </Link>
                        <Link to="/admin/reports" className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left">
                            <span className="block text-primary-600 dark:text-primary-400 font-bold mb-1">New Report</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Log a meeting or activity</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">System Status</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                            <span className="text-gray-600 dark:text-gray-300">Server Status</span>
                            <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">Online</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                            <span className="text-gray-600 dark:text-gray-300">Database</span>
                            <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
