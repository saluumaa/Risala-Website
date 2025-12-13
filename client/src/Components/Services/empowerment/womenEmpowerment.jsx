import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaAngleRight, FaHeartbeat, FaStethoscope, FaHandHoldingMedical, FaUserMd } from 'react-icons/fa';

const Health = () => {
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
            src="/health.jpg"
            alt="Health Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-teal-900/60 mix-blend-multiply" />
        </div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 text-sm md:text-base mb-4 text-teal-100">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <FaAngleRight />
              <span className="text-teal-200">Services</span>
              <FaAngleRight />
              <span>Health</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Health & Wellness
            </h1>
            <p className="text-xl text-teal-50 max-w-2xl">
              Ensuring accessible healthcare and promoting well-being for every individual in our community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-20">
        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title text-gray-900 dark:text-white">Our Approach</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              We believe that healthcare is a fundamental right. Our approach focuses on three pillars:
              <strong> Accessibility</strong>, <strong>Awareness</strong>, and <strong>Preventative Care</strong>.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              By organizing medical convoys, health education workshops, and providing essential medical supplies,
              we strive to create a healthier environment where prevention is prioritized over cure.
            </p>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-4 bg-teal-100 dark:bg-teal-900/30 rounded-2xl transform -rotate-2"></div>
            <img
              src="/health_section.jpg"
              alt="Medical Care"
              className="relative rounded-2xl shadow-xl w-full object-cover z-10"
            />
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title text-gray-900 dark:text-white">Health Services</h2>
            <p className="section-subtitle text-gray-600 dark:text-gray-300">
              Comprehensive care initiatives designed to serve the most vulnerable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUserMd className="w-10 h-10" />,
                title: "Medical Convoys",
                desc: "Bringing doctors and specialists to remote areas to provide free check-ups and treatments.",
                color: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
              },
              {
                icon: <FaHeartbeat className="w-10 h-10" />,
                title: "Health Education",
                desc: "Workshops on hygiene, nutrition, and disease prevention to empower communities.",
                color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
              },
              {
                icon: <FaHandHoldingMedical className="w-10 h-10" />,
                title: "Preventative Care",
                desc: "Vaccination drives and screenings to detect and prevent health issues early.",
                color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-teal-900 rounded-3xl p-12 text-center text-white mb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')]"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <FaStethoscope className="text-6xl mx-auto mb-6 text-teal-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
            <p className="text-xl text-teal-100 leading-relaxed">
              "To create a healthier community where every individual has access to the care they need,
              fostering an environment that supports long-term wellness and dignity."
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Support Our Health Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-teal-100">
            Your donation helps us buy medicine, fund surgeries, and reach more remote villages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <motion.button
                className="bg-white text-teal-700 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHandHoldingMedical />
                Donate for Health
              </motion.button>
            </Link>
            <Link to="/volunteer">
              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Volunteer as Medic
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
