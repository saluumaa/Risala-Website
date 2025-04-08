import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import apiRequest from '../../utils/apiRequest';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../../redux/UsersSlice';
import { motion } from 'framer-motion';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await apiRequest.post('/auth/login', data);
      dispatch(setUser(response.data));
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await apiRequest.post('/auth/register', data);
      dispatch(setUser(response.data));
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return isMobile;
  };

  const isMobile = useIsMobile();
  const radiusLoginMobile = '0px 200px 0px 200px';
  const radiusRegisterMobile = '0px 0px 200px 200px';

  const radiusLoginDesktop = '0px 200px 0px 200px';
  const radiusRegisterDesktop = '0px 0px 300px 300px';

  return (
    <div className=" flex flex-col md:flex-row items-center h-screen bg-bodyBackground overflow-hidden">
      {/* Left section with welcome message and login/register link, and top section for mobile */}
      <motion.div
        className="mt-24 bg-primary w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center  md:rounded-bl-none md:rounded-br-[200px] md:rounded-tr-[200px]
        "
        initial={{ x: 0, y: 0}}
        animate={{
          x: isMobile ? 0 : isRegister ? '100%' : 0,
          y: isMobile ? (isRegister ? '100%' : 0) : 0,
          borderRadius: isMobile
            ? isRegister
              ? radiusRegisterMobile
              : radiusLoginMobile
            : isRegister
            ? radiusRegisterDesktop
            : radiusLoginDesktop
        }}
        // animate={{
        //   x: isMobile ? 0 : isRegister ? '100%' : 0,
        //   y: isMobile ? (isRegister ? '100%' : 0) : 0
        // }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl  font-bold text-white text-center">Welcome to our community</h1>
        <motion.div
          className="text-center text-white mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isRegister ? (
            <>
              <p className="text-3xl">Create Your Account</p>
              <p className="text-lg" style={{ marginTop: '1rem' }}>
                Already have an account?{' '}
                <span onClick={() => setIsRegister(false)} className="font-semibold underline cursor-pointer">
                  Login
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="text-3xl py-2">Welcome Back!</p>
              <p className="text-lg">
                Don't have an account?{' '}
                <span
                  onClick={() => setIsRegister(true)} className="text-white font-semibold underline cursor-pointer"
                >
                  Register
                </span>
              </p>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Right section with the form taking the full width */}
      <motion.div
        className=" w-full md:w-1/2 h-1/2 md:h-full shadow-lg rounded-lg p-8 flex flex-col justify-center"
        initial={{ x: 0 }}
        animate={{
          x: isMobile ? 0 : isRegister ? '-100%' : 0,
          y: isMobile ? (isRegister ? '-100%' : 0) : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          {isRegister ? 'Create an Account' : 'Login'}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />

          <motion.button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
            whileTap={{ scale: 0.95 }}
          >
            {isRegister ? 'Register' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;