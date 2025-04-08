// import React, { useEffect } from 'react'
// import { FaEnvelope, FaBell, FaSignOutAlt, FaPlus } from 'react-icons/fa';
// import { selectUser, logout } from '../../redux/UsersSlice'
// import { useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import './profile.css'
// import { useState } from 'react';
// import AddNewNews from '../News/AddNewNews';
// import apiRequest from '../../utils/apiRequest';
// const Profile = () => {
//     const currentUser = useSelector(selectUser) || null
//     const [chats, setChats] = useState([]);
//     const navigate = useNavigate();
//     const dispatch = useDispatch(); 

//     const newMessages = chats.filter(chat => !chat.seenBy.includes(currentUser._id)).length;

//     useEffect(() => {
//         const fetchChats = async () => {
//             try {
//                 const res = await apiRequest.get(`/chats/`);
//                 console.log('Chat response:', res.data);
//                 setChats(res.data);
//             } catch (error) {
//                 console.error('Error fetching chats:', error);
//             }
//         };
//         fetchChats();
//     }, []);


//     const handleLogout = () => {
//         dispatch(logout());
//         navigate('/');
//     };
//     console.log('Chats:', chats);   

//   return (
//     <div className='profile-container'>
//       <div className='profile-header'>
//         <h1>Welcome, {currentUser.username}</h1>
//         <div className='profile-actions'>
//           {/* Notifications */}
//           <div className='notifications'>
//             <FaBell className='notification-icon' />
//             {newMessages > 0 && (
//               <span className='notification-badge'>{newMessages}</span>
//             )}
//           </div>
//           {/* Logout Button */}
//           <button className='logout-btn' onClick={handleLogout}>
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Section for New Messages */}
//       <div className='message-section'>
//         <h2>User Messages</h2>
//         {newMessages > 0 ? (
//           chats.filter(chat => !chat.seenBy.includes(currentUser._id)).map((chat) => (
//             <div className='message-item' key={chat._id}>
//              <Link to='./chats/:id' className='message-link'>
//                 <p>{chat.receiver.username}</p>
//                 <p>{chat?.messages[chat.messages.length - 1].text}</p>
//             </Link>
//             </div>
//           ))
//         ) : (
//           <p>No new messages</p>
//         )}
//       </div>

//       {/* Section to Add News */}
//       <div className='add-news-section'>
//         <h2>Add News</h2>
//         {/* <Link to="/add-news" className='add-news-btn'> */}
//         <div className="add-news-btn">
//            <AddNewNews />
//           </div>
//         {/* </Link> */}
//       </div>
//     </div>
//   )
// }

// export default Profile



// import { FaSignOutAlt } from 'react-icons/fa';
// import { selectUser, logout } from '../../redux/UsersSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';


// const Profile = () => {
//   const currentUser = useSelector(selectUser) || null;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

  

//   return (
//     <div className='profile-container'>
//       <div className='profile-header'>
//         <h1>Welcome, {currentUser.username}</h1>
//         <div className='profile-actions'>
          
//           <button className='logout-btn' onClick={handleLogout}>
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>
//       </div>
     
//     </div>
//   );
// };


import { FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { selectUser, logout } from '../../redux/UsersSlice';
import apiRequest from '../../utils/apiRequest';
import './profile.css';

const Profile = () => {
  const currentUser = useSelector(selectUser) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registeredStudents, setRegisteredStudents] = useState([]);
  const [isRegistrationActive, setIsRegistrationActive] = useState(false);

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


  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Fetch registered students if the user is admin
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      const fetchStudents = async () => {
        try {
          const response = await apiRequest.get('/syp');
          setRegisteredStudents(response.data);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
      fetchStudents();
    }
  }, [currentUser]);

  // console.log('Registered students:', registeredStudents);

  return (
    <div className="profile-container max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="profile-header flex justify-between items-center pt-9 mb-6">
        <h1 className="text-2xl font-bold text-blue-600">
          Welcome, {currentUser.username}
        </h1>
        <button
          className="logout-btn flex items-center gap-2 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* Registration Status */}
    <div className="profile-container">
      {currentUser?.role === 'admin' && (
        <div className="toggle-section">
          <h3>Registration Status: {isRegistrationActive ? 'Active' : 'Inactive'}</h3>
          <button
            className={`px-4 py-2 rounded ${
              isRegistrationActive ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
            onClick={handleToggle}
          >
            {isRegistrationActive ? 'Deactivate Registration' : 'Activate Registration'}
          </button>
        </div>
      )}
    </div>

      {/* Admin Section */}
      {currentUser?.role === 'admin' && (
        <div className="admin-section space-y-6">
          {/* View Registered Students */}
          <div className="registered-students bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Registered Students
            </h2>
            {registeredStudents?.length > 0 ? (
              <table className="w-full text-left border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Age</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Telephone
                    </th>
                    <th className="border border-gray-300 px-4 py-2">School</th>
                    <th className="border border-gray-300 px-4 py-2">Area</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredStudents?.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {student.participantName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.age}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.telephoneNo}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.school}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {student.area}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No registered students found.</p>
            )}
          </div>

          {/* Add Programmes & News */}
          <div className="actions bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Manage Content
            </h2>
            <div className="flex space-x-4">
              <Link
                to="/programmes"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Manage Programmes
              </Link>
              <Link
                to="/news"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Manage News
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
