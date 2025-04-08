// import './awareness.css';
// import { Link } from 'react-router-dom';
// import { FaAngleDoubleRight } from 'react-icons/fa';

// const Awareness = () => {
//   return (
//     <div className='awareness-container'>
//       <div className='awareness-header'>
//         <Link to='/' className='Home'><h1>Home</h1></Link>
//         <span><FaAngleDoubleRight /></span>
//         <Link to='/awareness' className='Services'><h1>Awareness</h1></Link>
//       </div>
//       <div className='awareness-content'>
//         <div className="awareness-goals">
//           <h2>Our Awareness Programs</h2>
//           <p>
//             We aim to increase awareness on important social issues through education and active engagement.
//           </p>
//         </div>

//         <div className="awareness-methods">
//           <h2>Our Methods</h2>
//           <p>
//             We utilize workshops, community events, and educational materials to spread awareness and foster change.
//           </p>
//         </div>

//         <div className="awareness-impact">
//           <h2>Our Impact</h2>
//           <p>
//             Over the years, we’ve empowered communities with knowledge on health, rights, and environmental issues.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Awareness;


import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';

const Awareness = () => {
  return (
    <div className="awareness-container bg-bodyBackground text-bodyColor">
      <div 
        className="education-header flex items-center justify-center space-x-4 text-xl text-white font-bold bg-cover bg-center p-6 h-60 rounded-lg shadow-lg"
        style={{ backgroundImage: 'url("/livelihood.jpg")' }}
      >
        <Link to="/" className="hover:text-blue-300">
          <h1>Home</h1>
        </Link>
        <span className="text-gray-600">
          <FaAngleDoubleRight />
        </span>
        <Link to="/awareness" className="hover:text-blue-300">
          <h1>Livelihood</h1>
        </Link>
      </div>

      <div className="awareness-content p-6">
        <div className="awareness-goals mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Livelihood Programs</h2>
          <p className="text-lg leading-relaxed">
           we aim to empowering vulnerable groups with necessary aid like food aid during Ramadan and Eid ceremony and cloth aid during winter season
          </p>
        </div>

        <div className="awareness-methods mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Methods</h2>
          <p className="text-lg leading-relaxed">
            We utilize workshops, community events, and educational materials to spread awareness and foster change. Our approach is participatory, ensuring that the voices of those we serve are heard and valued.
          </p>
        </div>

        <div className="awareness-impact mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Impact</h2>
          <p className="text-lg  leading-relaxed">
            Over the years, we’ve empowered communities with knowledge on health, rights, and environmental issues. Our initiatives have led to increased awareness and active participation in social change efforts.
          </p>
        </div>

        {/* Add a Call to Action Section */}
        <div className="call-to-action bg-blue-600 text-white p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
          <p className="text-lg mb-4">Join us in our mission to spread awareness and drive change. Your participation in our programs can make a significant impact on society.</p>
          <Link to="/get-involved" className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-2 rounded-lg font-semibold transition duration-300">
            Learn More & Get Involved
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
