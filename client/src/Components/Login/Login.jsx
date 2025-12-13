import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import apiRequest from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/UsersSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaFacebook } from 'react-icons/fa';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await apiRequest.post('/auth/login', data);
      dispatch(setUser(response.data));
      navigate('/');
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

        {/* Left Side - Image/Info */}
        <div className="md:w-1/2 bg-primary-600 p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold font-heading mb-6">
              Welcome Back!
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              To keep connected with us please login with your personal info.
            </p>
          </div>

          {/* Abstract Shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-50px] left-[-50px] w-40 h-40 rounded-full bg-white blur-3xl"></div>
            <div className="absolute bottom-[-50px] right-[-50px] w-60 h-60 rounded-full bg-white blur-3xl"></div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Sign In
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Use your admin or user account
            </p>
          </div>

          {/* Social Login (Placeholder) */}
          <div className="flex justify-center gap-4 mb-8">
            <button className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FaGoogle />
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <FaFacebook />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <AnimatePresence mode='wait'>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-lg text-sm text-center bg-red-100 text-red-700"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-primary-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              {!isLoading && <FaArrowRight />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;