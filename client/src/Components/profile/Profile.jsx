// import { FaSignOutAlt } from 'react-icons/fa';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { selectUser, logout } from '../../redux/UsersSlice';
// import apiRequest from '../../utils/apiRequest';

// const Profile = () => {
//   const currentUser = useSelector(selectUser) || null;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [registeredStudents, setRegisteredStudents] = useState([]);
//   const [isRegistrationActive, setIsRegistrationActive] = useState(false);

//   // Fetch registration status
//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const response = await apiRequest.get('/syp/status');
//         setIsRegistrationActive(response.data.isActive);
//       } catch (error) {
//         console.error('Error fetching registration status:', error);
//       }
//     };
//     fetchStatus();
//   }, []);

//   // Toggle registration status
//   const handleToggle = async () => {
//     try {
//       const newStatus = !isRegistrationActive;
//       await apiRequest.patch('/syp/activate', { isActive: newStatus });
//       setIsRegistrationActive(newStatus);
//     } catch (error) {
//       console.error('Error toggling registration status:', error);
//     }
//   };


//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   // Fetch registered students if the user is admin
//   useEffect(() => {
//     if (currentUser?.role === 'admin') {
//       const fetchStudents = async () => {
//         try {
//           const response = await apiRequest.get('/syp');
//           setRegisteredStudents(response.data);
//         } catch (error) {
//           console.error('Error fetching students:', error);
//         }
//       };
//       fetchStudents();
//     }
//   }, [currentUser]);

//   // console.log('Registered students:', registeredStudents);

//   return (
//     <div className="profile-container max-w-4xl mt-14 mx-auto p-6 bg-bodyBackground text-bodyColor rounded-lg shadow-md">
//       {/* Profile Header */}
//       <div className="profile-header flex justify-between items-center pt-9 mb-6">
//         <h1 className="text-2xl font-bold text-blue-600">
//           Welcome, {currentUser.username}
//         </h1>
//         <button
//           className="logout-btn flex items-center gap-2  bg-red-500 px-4 py-2 rounded hover:bg-red-600"
//           onClick={handleLogout}
//         >
//           <FaSignOutAlt />
//           Logout
//         </button>
//       </div>

//       {/* Registration Status */}
//     <div className="profile-container bg-bodyBackground text-bodyColor">
//       {currentUser?.role === 'admin' && (
//         <div className="toggle-section ">
//           <h3>Registration Status: {isRegistrationActive ? 'Active' : 'Inactive'}</h3>
//           <button
//             className={`px-4 py-2 rounded mt-3 ${
//               isRegistrationActive ? 'bg-red-500' : 'bg-green-500'
//             } text-primary`}
//             onClick={handleToggle}
//           >
//             {isRegistrationActive ? 'Deactivate Registration' : 'Activate Registration'}
//           </button>
//         </div>
//       )}
//     </div>

//       {/* Admin Section */}
//       {currentUser?.role === 'admin' && (
//         <div className="admin-section space-y-6 bg-bodyBackground text-bodyColor">
//           {/* View Registered Students */}
//           <div className="registered-students  p-4 rounded shadow-md">
//             <h2 className="text-xl font-semibold text-primary mb-4">
//               Registered Students
//             </h2>
//             {registeredStudents?.length > 0 ? (
//               <table className="w-full text-left border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-bodyBackground text-bodyColor">
//                     <th className="border border-gray-300 px-4 py-2">Name</th>
//                     <th className="border border-gray-300 px-4 py-2">Age</th>
//                     <th className="border border-gray-300 px-4 py-2">
//                       Telephone
//                     </th>
//                     <th className="border border-gray-300 px-4 py-2">School</th>
//                     <th className="border border-gray-300 px-4 py-2">Area</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-bodyColor">
//                   {registeredStudents?.map((student) => (
//                     <tr key={student._id} className="hover:bg-gray-50">
//                       <td className="border border-gray-300 px-4 py-2">
//                         {student.participantName}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {student.age}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {student.telephoneNo}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {student.school}
//                       </td>
//                       <td className="border border-gray-300 px-4 py-2">
//                         {student.area}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p className="text-primary">No registered students found.</p>
//             )}
//           </div>

//           {/* Add Programmes & News */}
//           <div className="actions p-4 rounded shadow-md">
//             <h2 className="text-xl font-semibold text-bodyColor mb-4">
//               Manage Content
//             </h2>
//             <div className="flex space-x-4">
//               <Link
//                to='/addnews'
//                 className="bg-green-500  text-lg px-16 py-2 rounded hover:bg-green-600"
//               >
//                 Add News
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


import React from 'react'
import AdminLayout from '../admin/AdminLayout';
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/UsersSlice'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const currentUser = useSelector(selectUser) || null;

  if (currentUser?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />
  }
  return (
    <div className=' rounded-lg shadow-md'>
 
    </div>
  )
}

export default Profile