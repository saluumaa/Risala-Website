// import { setUser, setError, logout } from './UsersSlice';
// import axios from 'axios';
// import { saveToken } from '../utils/localStorage'

// export const loginUser = (credentials) => async (dispatch) => {
//   try {
//     const response = await axios.post('http://localhost:3000/auth/sign_in', credentials);
//     saveToken(response.headers.authorization); 
//     dispatch(setUser(response.data));
//     return response.data;
//   } catch (error) {
//     dispatch(setError('Invalid credentials'));
//     throw error;
//   }
// };

// export const logoutUser = () => (dispatch) => {
//   dispatch(logout());
// };

