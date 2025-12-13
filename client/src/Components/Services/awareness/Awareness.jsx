import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaAngleRight, FaHandHoldingHeart, FaTshirt, FaUtensils, FaLeaf } from 'react-icons/fa';

const Awareness = () => {
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
            src="/livelihood.jpg"
            alt="Livelihood Support"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 text-sm md:text-base mb-4 text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <FaAngleRight />
              <span className="text-primary-400">Services</span>
              <FaAngleRight />
              <span>Livelihood</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              Livelihood Support
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Empowering vulnerable communities through sustainable aid and economic development programs.
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
            <h2 className="section-title text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              We aim to empower vulnerable groups by providing essential aid during critical times.
              From food distribution during Ramadan to clothing aid in winter, our goal is to ensure
              dignity and stability for families in need.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Beyond immediate relief, we work on sustainable livelihood projects that help families
              become self-sufficient and resilient against future challenges.
            </p>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl transform rotate-3"></div>
            <img
              src="/imageDonate.png"
              alt="Community Support"
              className="relative rounded-2xl shadow-xl w-full object-cover z-10"
            />
          </motion.div>
        </div>

        {/* Programs Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title text-gray-900 dark:text-white">Our Programs</h2>
            <p className="section-subtitle text-gray-600 dark:text-gray-300">
              Targeted initiatives to address immediate needs and long-term growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUtensils className="w-10 h-10" />,
                title: "Food Security",
                desc: "Providing food packages during Ramadan and Eid to ensure no family goes hungry.",
                color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
              },
              {
                icon: <FaTshirt className="w-10 h-10" />,
                title: "Clothing Aid",
                desc: "Distributing clothes and winter essentials to protect vulnerable families from harsh weather.",
                color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              },
              {
                icon: <FaLeaf className="w-10 h-10" />,
                title: "Sustainable Growth",
                desc: "Supporting small businesses and agricultural projects to create lasting economic independence.",
                color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
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

        {/* Impact Stats */}
        <div className="bg-primary-900 rounded-3xl p-12 text-center text-white mb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')]"></div>
          <div className="relative z-10 grid md:grid-cols-3 gap-8">
            {[
              { number: "5,000+", label: "Families Supported" },
              { number: "10,000+", label: "Meals Provided" },
              { number: "15+", label: "Communities Served" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-primary-200">{stat.number}</div>
                <div className="text-lg text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Make a Difference Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Your contribution can provide a meal, a warm coat, or a fresh start for a family in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/donate">
              <motion.button
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHandHoldingHeart />
                Donate Now
              </motion.button>
            </Link>
            <Link to="/volunteer">
              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join as Volunteer
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Awareness;
