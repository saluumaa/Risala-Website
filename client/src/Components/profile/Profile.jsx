import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logout } from '../../redux/UsersSlice';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Profile = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
      <div className="container-custom max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-primary-600 to-secondary-600"></div>

          {/* Profile Content */}
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="bg-white dark:bg-gray-800 p-1 rounded-full">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-4xl border-4 border-white dark:border-gray-800">
                  <FaUser />
                </div>
              </div>
              {currentUser.role === 'admin' && (
                <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 mb-2">
                  <FaShieldAlt /> Admin
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {currentUser.username}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Member since {new Date(currentUser.createdAt || Date.now()).toLocaleDateString()}
            </p>

            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mr-4">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">{currentUser.email}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 py-3 rounded-xl font-semibold transition-colors"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;