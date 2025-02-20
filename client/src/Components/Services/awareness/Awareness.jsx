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
    <div className="awareness-container bg-white text-gray-800">
      <div 
        className="education-header flex items-center justify-center space-x-4 text-xl text-primary font-bold bg-cover bg-center p-6 h-52"
        style={{ backgroundImage: 'url("https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=400")' }}
      >
        <Link to="/" className="hover:text-blue-300">
          <h1>Home</h1>
        </Link>
        <span className="text-gray-600">
          <FaAngleDoubleRight />
        </span>
        <Link to="/awareness" className="hover:text-blue-300">
          <h1>Awareness</h1>
        </Link>
      </div>

      <div className="awareness-content p-6">
        <div className="awareness-goals mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Awareness Programs</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We aim to increase awareness on important social issues through education, active engagement, and partnerships with local communities. Our programs are designed to empower individuals with the knowledge they need to make informed decisions and inspire positive social change.
          </p>
        </div>

        <div className="awareness-methods mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Methods</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We utilize various methods to spread awareness, including workshops, community events, digital campaigns, and educational materials. These approaches are tailored to reach diverse audiences and encourage participation at all levels of engagement.
          </p>
        </div>

        <div className="awareness-impact mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Over the years, we’ve successfully reached thousands of individuals and communities, empowering them with knowledge on health, rights, and environmental issues. Our work has sparked social change, promoted sustainability, and improved the quality of life for many.
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
