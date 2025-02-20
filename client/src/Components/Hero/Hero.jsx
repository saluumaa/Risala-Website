import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {FaFacebook, FaYoutube, FaTiktok, FaHeart} from 'react-icons/fa'
import './Hero.css'
import Donate from '../Donate/Donate'
import { useSelector} from 'react-redux';
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const [t, i18n] = useTranslation();
  const news = useSelector((state) => state.news.news);
  const images = news.length > 0 && news[news.length - 1].images.length > 0
  ? news[news.length - 1].images.map(image => `http://localhost:8800/${image}`)
  : ['/hero_image.jpeg'];



  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    // <section className='hero-wrapper' >
		// 	<div className='image-wrapper'>
		// 		<img src={images[index]
    //     } alt={`Organization Pictures  ${index + 1 }`} />

    //     <div className='image-overlay'>
    //       <motion.p
    //         initial={{ opacity: 0 }}
    //         animate={{ opacity: 1 }}
    //         transition={{ delay: 1, duration: 1 }}>
    //         {t('hero.title')}
    //       </motion.p>
    //     <motion.section className='social-icons'
    //       initial= {{scaleY: 0}}
    //       animate={{scaleY: 1}}
    //       transition={{delay: 1.5}}
    //     >
    //       <div>
    //       <Link to="/about"><button className='btn learn-more' style={{padding: "9px 15px"}}>{t('hero.learnMore')}</button></Link>
    //       </div>
    //       <div>
         
    //       </div>
          
    //   </motion.section>
    //     </div>
    //   </div>
    //   <Donate className="donate" />
    //  </section>
    <div className="relative min-h-64">
      <div className="absolute inset-0">
        <img src={images[index]
         } alt={`Organization Pictures  ${index + 1 }`}    
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-700/75"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <FaHeart className="h-12 w-12 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Empowering Communities,<br />Building Future Leaders
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Join us in our mission to provide education, healthcare, and sustainable development to communities in need across the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Donate Now
            </button>
            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Volunteer With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
