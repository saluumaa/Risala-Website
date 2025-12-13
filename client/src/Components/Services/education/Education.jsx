import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from "react-slick";
import { FaAngleRight, FaGraduationCap, FaBookReader, FaChalkboardTeacher, FaCalendarAlt, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import apiRequest from '../../../utils/apiRequest';

const Education = () => {
  const [isRegistrationActive, setIsRegistrationActive] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await apiRequest.get('/programme/settings');
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
      text: "The summer programme was honestly the best part of my year. We played team sports, visited beautiful places, and even did fun group challenges that helped us think critically."
    },
    {
      name: "Ayaan A.",
      image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "Before joining, I thought summer would be boring. But this programme totally changed that. I learned how to work in a team and gained leadership skills without even realizing it at first."
    },
    {
      name: "Ifrah B.",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
      text: "I used to be shy, but this programme helped me speak up and express myself better. From debates to art and sports, every activity made me feel like I mattered."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/education.jpg"
            alt="Education Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply" />
        </div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 text-sm md:text-base mb-4 text-blue-200">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <FaAngleRight />
              <span className="text-blue-300">Services</span>
              <FaAngleRight />
              <span>Education</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Education for All
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Unlocking potential through quality education, mentorship, and skill-building programs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-20">

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: "Our Programme",
              desc: "Enhancing awareness for middle and high school students through intensive training and creative study methods.",
              icon: <FaGraduationCap className="w-8 h-8" />,
              bg: "bg-blue-600"
            },
            {
              title: "Our Approach",
              desc: "A holistic approach focusing on the whole person, providing a supportive environment for students to learn and grow.",
              icon: <FaChalkboardTeacher className="w-8 h-8" />,
              bg: "bg-gray-800"
            },
            {
              title: "Our Mission",
              desc: "Committed to providing skills and knowledge to help students succeed in their chosen fields and future careers.",
              icon: <FaBookReader className="w-8 h-8" />,
              bg: "bg-blue-600"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`${item.bg} p-8 rounded-2xl shadow-lg text-white relative overflow-hidden group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative z-10">
                <div className="mb-6 bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  {item.icon}
                </div>
                <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                <p className="text-blue-50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Summer Program Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl mb-24 border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img
                src="/summer.jpg"
                alt="Summer Program"
                className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Summer Youth Programme</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                A transformative experience for students aged 11-19. We combine brainstorming activities, sports,
                and educational trips to create lasting memories and valuable life skills.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <FaCalendarAlt className="text-blue-600 dark:text-blue-400 w-6 h-6 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">When</h4>
                    <p className="text-gray-600 dark:text-gray-400">June - July (Annually)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 w-6 h-6 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Where</h4>
                    <p className="text-gray-600 dark:text-gray-400">Onsite + Field Trips</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaUsers className="text-blue-600 dark:text-blue-400 w-6 h-6 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Who</h4>
                    <p className="text-gray-600 dark:text-gray-400">Primary - High School</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-blue-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Ready to Join?</h3>
                <Link to={isRegistrationActive ? "/programme" : "#"}>
                  <button
                    disabled={!isRegistrationActive}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-md ${isRegistrationActive
                      ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:-translate-y-1'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                  >
                    {isRegistrationActive ? 'View Programme & Register' : 'Registration Closed'}
                  </button>
                </Link>
                {!isRegistrationActive && (
                  <p className="text-sm text-gray-500 mt-2 text-center">Check back later for next season's opening.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title text-gray-900 dark:text-white mb-12">Student Stories</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-blue-100 dark:border-gray-700"
                    />
                    <p className="text-xl text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {testimonial.name}
                    </h4>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Education;
