import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaHandsHelping, FaHeart, FaUsers, FaArrowRight, FaNewspaper, FaCalendarAlt } from 'react-icons/fa';
import Hero from '../Hero/Hero';
import Service from '../Services/Service';
import Impact from '../Impact';
import Testimonials from '../Testimonial';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import apiRequest from '../../utils/apiRequest';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  // Refs for GSAP animations
  const missionRef = useRef(null);
  const cardsRef = useRef(null);
  const servicesRef = useRef(null);
  const newsRef = useRef(null);
  const ctaRef = useRef(null);
  const [news, setNews] = useState([]);
  const [activeProgramme, setActiveProgramme] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await apiRequest.get('/news');
        setNews(res.data.slice(0, 3)); // Get latest 3 news items
      } catch (err) {
        console.log(err);
      }
    };

    const fetchProgrammeStatus = async () => {
      try {
        const res = await apiRequest.get('/programme/settings');
        setActiveProgramme(res.data.isActive);
      } catch (error) {
        console.error("Error fetching programme status:", error);
      }
    };

    fetchNews();
    fetchProgrammeStatus();
  }, []);

  // GSAP Scroll Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mission section fade in
      gsap.from(missionRef.current, {
        scrollTrigger: {
          trigger: missionRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
      });

      // Cards stagger animation
      gsap.from(cardsRef.current.children, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });

      // Services parallax
      gsap.from(servicesRef.current, {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        opacity: 1,
      });

      // News section animation
      if (newsRef.current) {
        gsap.from(newsRef.current, {
          scrollTrigger: {
            trigger: newsRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
        });
      }

    });

    return () => ctx.revert();
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Alert */}
      <div className="relative">
        <Hero />
        {activeProgramme && (
          <div className="absolute top-32 left-0 right-0 z-20 flex justify-center pointer-events-none">
            <div className="animate-bounce pointer-events-auto">
              <Link to="/programme" className="inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-lg transition-all transform hover:scale-105">
                <span className="mr-2">📢</span>
                Summer Youth Programme is Open! Register Now
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mission Section */}
      <section className="pt-40 bg-white dark:bg-gray-900">
        <div className="container-custom">
          {/* Mission Cards */}
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: <FaGraduationCap className="h-12 w-12" />,
                title: "Education",
                description: "Providing quality education and learning opportunities for youth",
                color: "primary"
              },
              {
                icon: <FaHandsHelping className="h-12 w-12" />,
                title: "Community Support",
                description: "Building stronger communities through collaborative programs",
                color: "secondary"
              },
              {
                icon: <FaHeart className="h-12 w-12" />,
                title: "Healthcare",
                description: "Ensuring access to essential healthcare services for all",
                color: "accent"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="card text-center group hover:shadow-xl relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <motion.div
                    className={`text-${item.color}-600 dark:text-${item.color}-400 mb-4 flex justify-center`}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold font-heading mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Departments Section */}
      <section ref={servicesRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <Service />
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <div className="container-custom relative z-10">
          <Impact />
        </div>
      </section>

      {/* Latest News Section */}
      <section ref={newsRef} className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title text-gray-900 dark:text-white">Latest News</h2>
            <p className="section-subtitle text-gray-600 dark:text-gray-300">
              Stay updated with our latest activities and announcements
            </p>
          </div>

          {news.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {news.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="h-48 overflow-hidden relative">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={`https://risala-website.onrender.com/${item.images[0]}`}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <FaNewspaper className="text-4xl text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      News
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <FaCalendarAlt className="mr-2" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-800 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {item.body}
                    </p>
                    <Link
                      to={`/news/${item.id}`}
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                    >
                      Read More <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <p>No news updates available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/news">
              <button className="px-8 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 rounded-lg font-bold hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors">
                Explore More Projects
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">

          <Testimonials />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white relative overflow-hidden">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-accent-500/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="container-custom relative z-10">
          <motion.div
            ref={ctaRef}
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FaUsers className="h-16 w-16 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Your support can transform lives. Whether through donations, volunteering,
              or spreading awareness, every contribution matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate">
                <motion.button
                  className="bg-white text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Donate Now</span>
                  <FaHeart />
                </motion.button>
              </Link>
              <Link to="/volunteer">
                <motion.button
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-900 transition-all duration-200 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Become a Volunteer</span>
                  <FaArrowRight />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;