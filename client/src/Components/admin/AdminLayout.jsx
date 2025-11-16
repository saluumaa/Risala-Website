// src/Components/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaChartBar, FaUsers, FaNewspaper, FaCog, FaBars, FaTimes, FaDoorOpen } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser, logout } from '../../redux/UsersSlice';

const AdminLayout = () => {
  const currentUser = useSelector(selectUser)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen mt-14 lg:mt-20 bg-bodyBackground text-bodyColor ">
      {/* Sidebar */}
      <div className={`fixed md:static bg-primary rounded-lg shadow-lg text-bodyColor p-5 lg:w-64 w-48  min-h-screen transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex justify-between items-center mb-6 md:hidden ">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <button onClick={toggleSidebar}><FaTimes /></button>
        </div>

        <div className="flex flex-col space-y-4 ">
          <Link to="/admin/dashboard" className="flex items-center space-x-2 hover:text-yellow-300">
            <FaChartBar />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/users" className="flex items-center space-x-2 hover:text-yellow-300">
            <FaUsers />
            <span>Users</span>
          </Link>
          <Link to="/admin/programs" className="flex items-center space-x-2 hover:text-yellow-300">
            <FaNewspaper />
            <span>Programs</span>
          </Link>
          <Link to="/admin/summerProgram" className="flex items-center space-x-2 hover:text-yellow-300">
            <FaNewspaper />
            <span>Summer Programs</span>
          </Link>
          <Link to="/admin/charts" className="flex items-center space-x-2 hover:text-yellow-300">
            <FaChartBar />
            <span>Charts</span>
          </Link>

          <button onClick={() => { logout(); window.location.href = '/' }} className="flex items-center mb-auto space-x-2 hover:text-yellow-300">
            <FaDoorOpen />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-10 p-4">
        {/* Top bar for mobile toggle */}
        <div className="md:hidden mb-4">
          <button onClick={toggleSidebar} className="text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Dynamic content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
