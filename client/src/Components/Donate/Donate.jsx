import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import './Donate.css'
import { Link } from 'react-router-dom'

const Donate = () => {
    const { t } = useTranslation();
  return (

        <motion.div className='donate-wrapper'
            initial={{rotateY:-130, opacity: 0}}
            whileInView={{rotateY: 0, opacity: 1}}
            transition={{duration: 1}}
        >
            <motion.div className='donate-content one'
                initial={{rotateX: 120, opacity: 0}}
                animate={{rotateX: 0, opacity: 1}}
                transition={{delay: 1, duration: 1, type: 'spring', stiffness: 150}}
            >
                <h2>{t('donate.h2')}</h2>       
                <p>
                <span style={{fontWeight:'700', fontSize: '20px', paddingRight:'5px', color: 'white'}}>{t('donate.span')}</span>
                {t('donate.p')}
                </p>
            </motion.div>
            <motion.div className='donate-content two'
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{delay: 1}}
            >
                <h2> {t('donate.h2Donated')} </h2>            
                <p>
                    {t('donate.pDonated')}
                </p>
                <button className='btn donate-btn'> {t('donate.donateNow')} </button>
            </motion.div>
            <motion.div className='donate-content three'
                initial={{rotateX: -120, opacity: 0}}
                animate={{rotateX: 0, opacity: 1}}
                transition={{delay: 1, duration: 1, type: 'spring', stiffness: 150}}
            >
                <h2>
                   {t('donate.h2Volunteer')}
                </h2>
                <p>
                    {t('donate.pVolunteer')}
                </p>
                <Link to='/volunteer'> <button className='btn donate-btn vol-btn'>{t('donate.volunteerNow')}</button> </Link>
            </motion.div>
        </motion.div>

  )
}

export default Donate