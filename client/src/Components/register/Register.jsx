import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import apiRequest from '../../utils/apiRequest';
import { useNavigate, Link } from 'react-router-dom';
import { setUser, logout, selectUser } from '../../redux/UsersSlice';
import '../Login/Login.css';

const Login = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data={
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    try {
     const response = await apiRequest.post('/auth/register', data);
      dispatch(setUser(response.data));
      navigate('/login');
    
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleLogin} className='login-form' style={{ marginTop: '100px' }}>

        <input type="username" name='username' placeholder='username'  />
        <input type="email" name='email' placeholder='email'  />
        <input type="password"  name='password' placeholder='password' />
        <div className='button-register-wrapper'>
        <button type="submit">Register</button>
        <Link className='register-link' to="/login">Already have an account?<span>Login</span></Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
