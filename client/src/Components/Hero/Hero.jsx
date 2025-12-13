import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [t] = useTranslation();
  const news = useSelector((state) => state.news.news);

  const images = news.length > 0 && news[news.length - 1].images.length > 0
    ? news[news.length - 1].images.map(image => `http://localhost:8800/${image}`)
    : ['/education2.jpg', '/volunteer.avif'];

  const [index, setIndex] = useState(0);

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const iconRef = useRef(null);

  // Image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Icon animation - bounce in
      tl.from(iconRef.current, {
        scale: 0,
        rotation: -180,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      // Title animation - split text reveal
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.3');

      // Subtitle animation - fade and slide
      tl.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
      }, '-=0.5');

      // Buttons animation - stagger
      tl.from(buttonsRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      }, '-=0.4');

      // Stats animation - count up effect
      // Stats animation - Book Open Effect
      tl.from(statsRef.current, {
        rotationX: 90,
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power2.out',
        transformOrigin: 'bottom center',
      }, '-=0.2');

      // Stagger stats content
      tl.from(statsRef.current.children[0].children, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      }, '-=0.8');

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 200,
        opacity: 0.8,
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Floating animation for icon
  useEffect(() => {
    gsap.to(iconRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Slideshow */}
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`Risala ${idx + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: idx === index ? 1 : 0,
              scale: idx === index ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        ))}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-800/85 to-secondary-700/75" />

        {/* Animated particles/dots */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom py-32 md:py-40">
        <div className="max-w-4xl">
          {/* Icon */}
          <div ref={iconRef} className="mb-6">
            <FaHeart className="h-16 w-16 text-accent-400 drop-shadow-lg" />
          </div>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white mb-6 leading-tight"
          >
            {t('hero.title1')}
            <br />
            <span className="text-accent-400 inline-block">
              {t('hero.title2')}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl leading-relaxed"
          >
            {t('hero.text')}
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
            <Link to="/donate">
              <motion.button
                className="group bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t('hero.donate')}</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link to="/volunteer">
              <motion.button
                className="group bg-white hover:bg-gray-50 text-primary-900 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t('hero.volunteer')}</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>

          {/* Stats */}
          {/* Stats Section moved to bottom */}
        </div>
      </div>

      {/* Stats Section with Book Open Animation */}
      <div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-t border-white/20 transform-gpu"
        style={{ perspective: '1000px', transformOrigin: 'bottom' }}
      >
        <div className="container-custom py-8">
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">500+</div>
              <div className="text-gray-200 text-sm md:text-base font-medium uppercase tracking-wider">Students Helped</div>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-transform duration-300 border-l border-r border-white/20">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">50+</div>
              <div className="text-gray-200 text-sm md:text-base font-medium uppercase tracking-wider">Programs</div>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">10+</div>
              <div className="text-gray-200 text-sm md:text-base font-medium uppercase tracking-wider">Years Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
