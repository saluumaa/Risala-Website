import React from 'react';
import Login from '../Login/Login';

// Reuse the Login component which handles both login and register
const Register = () => {
  return <Login />;
};

export default Register;
