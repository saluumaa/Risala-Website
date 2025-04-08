// import './health.css';
// import { Link } from 'react-router-dom';
// import { FaAngleDoubleRight } from 'react-icons/fa';

// const Health = () => {
//   return (
//     <div className='health-container'>
//       <div className='health-header'>
//         <Link to='/' className='Home'><h1>Home</h1></Link>
//         <span><FaAngleDoubleRight /></span>
//         <Link to='/health' className='Services'><h1>Health</h1></Link>
//       </div>
//       <div className='health-content'>
//         <div className="health-services">
//           <h2>Health Services</h2>
//           <p>
//             We provide accessible health services and promote preventative care through various initiatives.
//           </p>
//         </div>

//         <div className="health-approach">
//           <h2>Our Approach</h2>
//           <p>
//             Our health services focus on accessibility, awareness, and preventative measures to ensure the well-being of all individuals.
//           </p>
//         </div>

//         <div className="health-vision">
//           <h2>Our Vision</h2>
//           <p>
//             To create a healthier community where every individual has access to the care they need.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Health;

import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';

const Health = () => {
  return (
    <div className="health-container bg-bodyBackground text-bodyColor ">
      {/* Header Section */}
      <div 
        className="education-header flex items-center justify-center space-x-4 text-xl text-primary font-bold bg-cover bg-center p-6 h-60 rounded-lg shadow-lg"
        style={{ backgroundImage: 'url("/health.jpg")' }}
      >
        <Link to="/" className="hover:text-green-300">
          <h1>Home</h1>
        </Link>
        <span className="text-gray-600">
          <FaAngleDoubleRight />
        </span>
        <Link to="/health" className="hover:text-green-300">
          <h1>Health</h1>
        </Link>
      </div>

      {/* Content Section */}
      <div className="health-content p-6">
        {/* Health Services */}
        <div className="health-services mb-12">
          <h2 className="text-3xl font-semibold mb-4">Health Services</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We provide accessible health services to improve health awareness, encourage a healthy lifestyle and promote community well-being through medical conveys and health education
          </p>
        </div>

        {/* Our Approach */}
        <div className="health-approach mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Approach</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our approach focuses on three pillars: accessibility, awareness, and preventative care. We believe that everyone should have access to health services, and we work hard to educate communities on the importance of maintaining a healthy lifestyle.
          </p>
        </div>

        {/* Our Vision */}
        <div className="health-vision mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our vision is to create a healthier community where every individual has access to the care they need, fostering an environment that supports long-term wellness and prevention.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="call-to-action bg-green-600 text-white p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Join Our Health Initiatives</h2>
          <p className="text-lg mb-4">
            Get involved in our health programs today! Whether you're looking for preventative services, health education, or volunteer opportunities, there is a way for you to make a difference.
          </p>
          <Link to="/get-involved" className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-2 rounded-lg font-semibold transition duration-300">
            Learn More & Get Involved
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Health;
