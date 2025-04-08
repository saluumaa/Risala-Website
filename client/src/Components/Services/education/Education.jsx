// import './education.css'
// import { Link } from 'react-router-dom'
// import { FaAngleDoubleRight } from 'react-icons/fa'
// import { useState, useEffect } from 'react';
// import apiRequest from '../../../utils/apiRequest';

// const Education = () => {
//   const [isRegistrationActive, setIsRegistrationActive] = useState(false);

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const response = await apiRequest.get('/syp/status')
//         setIsRegistrationActive(response.data.isActive);
       
//       } catch (error) {
//         console.error('Error fetching registration status:', error);
//       }
//     };
//     fetchStatus();
//   }, []);

//   console.log(isRegistrationActive);

//   return (
//     <div className='education-container'>
//       <div className='education-header'>
//         <Link to='/' className='Home'><h1>Home</h1></Link>
//         <span> < FaAngleDoubleRight /> </span> 
//         <Link to='/education' className='Services'><h1>Education</h1></Link>
//       </div>
//       <div className='education-content'>
        
//           {/* <div className="projects-header">
//             <p className="line"></p>
//             <h2>Projects</h2>
//           </div> */}
//           <div className='education-projects'>
            
//               <div className="our-programmes">
//                 <h2>Our Programmes</h2>
//                 <p>
//                  we offer a wide range of programmes to help students achieve their goals.
//                  we also provide a range of support services to help students succeed.
//                 </p>
//               </div>

//               <div className="our-aproach ">
//                 <h2>Our Approach</h2>
//                 <p>
//                   we take a holistic approach to education, focusing on the whole person.
//                   we provide a supportive and nurturing environment for students to learn and grow.
//                 </p>
//               </div>
//          </div>

//         <div className='education-mission'>
//           <h2>Our Mission: </h2>
//           <p>
//             we are committed to providing skills and knowledge to help students succeed in their chosen field.
//           </p>
//       </div>
//       </div>
//       <div className="summer-programe">
//          <div className="s-header">
//           <img src='https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400' alt='summer' />
//             <div className="s-desc">
//               <h2>Summer Programe
//                 <span></span>
//               </h2>
//               <p>summer programme is for students who want to learn new skills and gain experience in a short period of time.</p>
//             </div>
//          </div>
//           <div className="s-content">
//              <div className="purpose">
//                 <h3>programme Purpose</h3>
//                 <p>
//                   The purpose of the summer programme is to provide students with an opportunity to learn new skills and gain experience in a short period of time.
//                 </p>
//              </div>

//               <div className="benefits">
//                 <h3>Benefits</h3>
//                 <p>
//                   The summer programme provides students with an opportunity to learn new skills and gain experience in a short period of time.
//                 </p>
//               </div>
//             <div className="summer-approach">
//                 <div className="when descr">
//                   <h3>When</h3>
//                   <p>Summer time (June-July every year) </p>
//                 </div>
//                 <div className="where descr">
//                   <h3>Where</h3>
//                   <p>onsite and includes field trips </p>
//                 </div>
//                 <div className="our-target descr">
//                   <h3>Our Target</h3>
//                   <p>primary-high school students </p>
//                 </div>
//             </div>
            
//             <div className="register">
//               <h3>Register Now</h3>
//               <Link to='/summerYouth'>
//               <button
//                 disabled={!isRegistrationActive}
//                 className={`px-4 py-2 rounded ${
//                   isRegistrationActive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
//                 } text-slate-100 font-semibold
//                 `}
//               >
//                 Click to Register
//               </button>
//               </Link>
//             </div>
           
//           </div>
//       </div>
//       <div className="testimonials">
//         <div className="testimonials-header">
//           <p className="line"></p>
//           <h2>Our Beneficery Testimonials</h2>
//         </div>
//         <div className="testimonials-content">
//           <div className="testimonial">
//             <img src='https://images.pexels.com/photos/267491/pexels-photo-267491.jpeg?auto=compress&cs=tinysrgb&w=400' alt='testimonial' />
//             <div className="testimonial-des">
//               <h3>Salum Ibro</h3>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>
//             </div>
//           </div>

//           <div className="testimonial">
//             <img src='https://images.pexels.com/photos/267491/pexels-photo-267491.jpeg?auto=compress&cs=tinysrgb&w=400' alt='testimonial' />
//             <div className="testimonial-des">
//               <h3>Abdilahi</h3>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>
//             </div>
//           </div>

//           <div className="testimonial">
//             <img src='https://images.pexels.com/photos/267491/pexels-photo-267491.jpeg?auto=compress&cs=tinysrgb&w=400' alt='testimonial' />
//             <div className="testimonial-des">
//               <h3>Abdirizak</h3>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Education

import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import Slider from "react-slick";
import apiRequest from '../../../utils/apiRequest';




const Education = () => {
  const [isRegistrationActive, setIsRegistrationActive] = useState(false);

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

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: false,
  };

  const testimonials = [
    {
      name: "Hassan M.",
      image: "https://images.pexels.com/photos/7620418/pexels-photo-7620418.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "The summer programme was honestly the best part of my year. We played team sports, visited beautiful places, and even did fun group challenges that helped us think critically. I met new friends and discovered what I love most — learning through experience. I’m more confident in school now, and I can’t wait for next summer!"
    },
    {
      name: "Ayaan A.",
      image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "Before joining, I thought summer would be boring. But this programme totally changed that. I learned how to work in a team and gained leadership skills without even realizing it at first. The trips were amazing, and the mentors were so kind and encouraging!"
    },
    {
      name: "Ifrah B.",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "I used to be shy, but this programme helped me speak up and express myself better. From debates to art and sports, every activity made me feel like I mattered. It really gave me a boost in confidence and made me look forward to learning again."
    }
  ];
  


  return (
    <div className="education-container text-bodyColor bg-bodyBackground py-16 px-6">
      <div 
        className="education-header flex items-center justify-center space-x-4 text-xl text-primary font-bold bg-cover bg-center p-6 h-60 rounded-lg shadow-lg"
        style={{ backgroundImage: 'url("/education.jpg")' }}
      >
        <Link to="/" className="hover:text-blue-800">
          <h1>Home</h1>
        </Link>
        <span className="text-gray-600">
          <FaAngleDoubleRight />
        </span>
        {/* <Link to="/education" className="hover:text-blue-800"> */}
          <h1>Education</h1>
        {/* </Link> */}
      </div>


      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="our-programmes bg-blue-500 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-white">Our Education Programme</h2>
            <p className="text-lg text-white mt-4">
              Our purpose is to enhance the awareness students middle- and high school through intensive trainings, skill-building, and show them creative ways to study
            </p>
          </motion.div>

          <motion.div
            className="our-approach bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-white">Our Approach</h2>
            <p className="text-lg text-white mt-4">
              We take a holistic approach to education, focusing on the whole person. We provide a supportive and nurturing environment for students to learn and grow.
            </p>
          </motion.div>

          <motion.div
          className="education-mission  bg-blue-500 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
          <p className="text-lg text-white mt-4">
            We are committed to providing skills and knowledge to help students succeed in their chosen field.
          </p>
        </motion.div>
        </div>

   
      </div>

      <motion.div
        className="summer-program  mt-16 p-8 rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="s-header flex items-center space-x-8">
          <img
            src="/summer.jpg"
            alt="summer"
            className="rounded-lg w-1/2"
          />
          <div className="s-desc w-1/2">
            <h2 className="text-3xl font-semibold">Summer Programme</h2>
            <p className="mt-4 text-lg ">
              The summer programme is for for students between 11-19, those benefit a lot of brainstorming activities, sport activities and trip to wonderful palaces which enhance their experience and left a great impression that result in their educational journey.
            </p>
          </div>
        </div>

        <div className="s-content mt-8 space-y-6">
          <motion.div
            className="purpose bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-600">Programme Purpose</h3>
            <p className="mt-2 text-lg text-gray-700">
              The purpose of the summer programme is to provide students with an opportunity to learn new skills and gain experience in a short period of time.
            </p>
          </motion.div>

          <motion.div
            className="benefits bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-blue-600">Benefits</h3>
            <p className="mt-2 text-lg text-gray-700">
              The summer programme provides students with an opportunity to learn new skills and gain experience in a short period of time.
            </p>
          </motion.div>

          <motion.div
            className="summer-approach grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="when">
              <h3 className="text-xl font-semibold text-blue-600">When</h3>
              <p className="mt-2 text-lg  ">Summer time (June-July every year)</p>
            </div>
            <div className="where">
              <h3 className="text-xl font-semibold text-blue-600">Where</h3>
              <p className="mt-2 text-lg ">Onsite and includes field trips</p>
            </div>
            <div className="our-target">
              <h3 className="text-xl font-semibold text-blue-600">Our Target</h3>
              <p className="mt-2 text-lg ">Primary-high school students</p>
            </div>
          </motion.div>

          <motion.div
            className="register mt-8 flex justify-center items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-primary">Register Now</h3>
            <Link to="/summerYouth">
              <button
                disabled={!isRegistrationActive}
                className={`px-6 py-3 rounded-lg mt-1 text-white font-semibold transition duration-300 ${
                  isRegistrationActive
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Click to Register
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
      className=" text-bodyColor p-8  mx-auto mt-16 max-w-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
     >
      <div className="testimonials-header text-center mb-8">
        <h2 className="text-3xl font-semibold ">Our Beneficiary Testimonials</h2>
      </div>

      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className=" flex justify-center items-center p-6 rounded-lg shadow-md max-w-xl mx-auto">
            <img
              src={testimonial.image}
              alt={`Testimonial by ${testimonial.name}`}
              className="rounded-full w-24 h-24 mx-auto"
            />
            <div className="testimonial-des mt-4 text-center mx-auto">
              <h3 className="text-xl font-semibold ">{testimonial.name}</h3>
              <p className="mt-2 text-lg ">"{testimonial.text}"</p>
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
    </div>
  );
};

export default Education;

