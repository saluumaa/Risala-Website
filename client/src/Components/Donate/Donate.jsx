// import React from 'react'
// import { useTranslation } from 'react-i18next'
// import { motion } from 'framer-motion'
// import './Donate.css'
// import { Link } from 'react-router-dom'

// const Donate = () => {
//     const { t } = useTranslation();
//   return (

//         <motion.div className='donate-wrapper'
//             initial={{rotateY:-130, opacity: 0}}
//             whileInView={{rotateY: 0, opacity: 1}}
//             transition={{duration: 1}}
//         >
//             <motion.div className='donate-content one'
//                 initial={{rotateX: 120, opacity: 0}}
//                 animate={{rotateX: 0, opacity: 1}}
//                 transition={{delay: 1, duration: 1, type: 'spring', stiffness: 150}}
//             >
//                 <h2>{t('donate.h2')}</h2>       
//                 <p>
//                 <span style={{fontWeight:'700', fontSize: '20px', paddingRight:'5px', color: 'white'}}>{t('donate.span')}</span>
//                 {t('donate.p')}
//                 </p>
//             </motion.div>
//             <motion.div className='donate-content two'
//                 initial={{ opacity: 0}}
//                 animate={{ opacity: 1}}
//                 transition={{delay: 1}}
//             >
//                 <h2> {t('donate.h2Donated')} </h2>            
//                 <p>
//                     {t('donate.pDonated')}
//                 </p>
//                 <button className='btn donate-btn'> {t('donate.donateNow')} </button>
//             </motion.div>
//             <motion.div className='donate-content three'
//                 initial={{rotateX: -120, opacity: 0}}
//                 animate={{rotateX: 0, opacity: 1}}
//                 transition={{delay: 1, duration: 1, type: 'spring', stiffness: 150}}
//             >
//                 <h2>
//                    {t('donate.h2Volunteer')}
//                 </h2>
//                 <p>
//                     {t('donate.pVolunteer')}
//                 </p>
//                 <Link to='/volunteer'> <button className='btn donate-btn vol-btn'>{t('donate.volunteerNow')}</button> </Link>
//             </motion.div>
//         </motion.div>

//   )
// }

// export default Donate


import React from 'react';

const DonatePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex flex-col items-center p-8 mt-14">
      <div className="max-w-4xl w-full text-center space-y-6 ">
        <h1 className="text-5xl font-bold text-blue-700">Support a Cause That Matters</h1>
        <p className="text-lg text-gray-700">
          Your donation fuels life-changing programs in <strong>Health Awareness</strong>, <strong>Education</strong>, and <strong>Livelihood Support</strong>.
          Together, we empower communities and build a brighter future.
        </p>

        <div className="bg-white shadow-xl p-6 rounded-xl border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Donate via Bank Transfer</h2>
          <p className="text-gray-700"><strong>Account Name:</strong> Risala Organisation</p>
          <p className="text-gray-700"><strong>Bank Name:</strong> Risala</p>
          <p className="text-gray-700"><strong>Account Number:</strong> 1234567890</p>
          <p className="text-gray-700"><strong>Mobile Money:</strong> +252634555500 / +252654555500</p>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Want to donate differently?</h2>
          <p className="text-gray-700 mb-2">
            We also provide an <strong>eLearning platform</strong> with courses on essential skills. 
            When you buy a course, part of your payment goes directly to supporting community projects.
          </p>
          <a
            href="/elearning"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Learn & Support
          </a>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-medium text-gray-800">❤️ Every little contribution counts.</h3>
          <p className="text-gray-600">Your support helps us touch lives, bring hope, and create a legacy of impact.</p>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
