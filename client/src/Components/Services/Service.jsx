import React from 'react'
import { useTranslation } from 'react-i18next'
import {motion} from 'framer-motion'
import './Service.css'
import '../News/News.css'
import { Link } from 'react-router-dom'

const Service = () => {
  const {t, i18n} = useTranslation();
  return (
    <motion.div className='services'
      initial={{y:90, opacity: 0}}
      whileInView={{y: 0, opacity: 1}}
      ransition={{duration: 1, type: 'spring', stiffness: 150}}
    >
      
      <div className='flex items-center gap-3 mt-20 md:mt-56'>
      <span className='w-[200px] h-1 bg-blue-500 z-10 '></span>
      <motion.div className='text-2xl font-bold'
          initial={{ opacity: 0, x:-10, y: -100 }}
          animate={{ opacity: 1, y: -5, x: -4 }}
      >
      <h1 className='text-4xl font-bold'> {t('services.mainTitle')} </h1>
      </motion.div>
    </div>
      <div className='services-container'>
        <div className='services-content'>
          <Link to='/education'>
          <div className='services-img'>
            <img src='/health_section.jpg' alt='health sector' />
          </div>
          <div className='services-text'>
          <h2>
            {t('services.eTitle')}
          </h2>
          <p>
           {t('services.eText')}
          </p>
          </div>
          </Link>
        </div>
        <div className='services-content'>
          <Link to='/awareness'>
         <div className='services-img'>
            <img src='/health_section.jpg' alt='health sector' />
          </div>
          <div className='services-text'>
          <h2>{t('services.hTitle')} </h2>
          <p>
            {t('services.hText')}
          </p>
          </div>
          </Link>
        </div>
        <div className='services-content'>
          <Link to='/empowerment'>
        <div className='services-img'>
            <img src='/health_section.jpg' alt='health sector' />
          </div>
          <div className='services-text'>
          <h2>
            {t('services.fTitle')}
          </h2>
          <p>
            {t('services.fText')}
          </p>
          </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Service