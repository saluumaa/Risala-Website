// import React from 'react'
// import {motion} from 'framer-motion'
// import { Award } from 'react-feather'
// import './About.css'


// const achievements = [
//   '5000+ Lives Impacted',
//   '100+ Community Projects',
//   '25+ Countries Reached'
// ];


// const About = () => {
//   return (
//     <div className='about-container'>
//       <div className='about-content-main'>
//       <motion.div className='about-image'
//         animate={{
//           initial: { x: -100, rotate: 0, borderRadius: 50 },
//           scale: [1, 2, 1, 1, 1],
//           rotate: [0, 0, 180, 180,  0],
//           borderRadius: ["0%", "0%", "50%", "50%", "0%"],
//         }}
//         transition={{
//           duration: 1,
//           ease: "easeInOut",
//           times: [0, 0.2, 0.5, 0.8, 1],
//           repeat:0,
//           repeatType: "loop",
//           repeatDelay: 1
//         }}
//       >
//           <img src='/about_image.PNG' alt='about' />
//        </motion.div>
//         <motion.div className='about-text'
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, type: 'spring', stiffness: 150 }}
//         >
//         <h1 className='about-title'>GET TO KNOW US</h1>
//           <p>Al-Risala Organization is a non-profit organization that focuses on education and social activities.
//           it was established in 2017 and has been active in various fields such as education, social, and religion.
//           Since 2010, we've been dedicated to creating positive change through sustainable development,
//             education, and community empowerment across the globe.
//           </p>
//         </motion.div>
//     </div>

//     <div className="bg-bodyBackground text-bodyColor grid md:grid-cols-3 gap-12 mb-20">
//           {achievements.map((achievement) => (
//             <div key={achievement} className="text-center">
//               <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
//               <p className="text-lg  ">{achievement}</p>
//             </div>
//           ))}
//       </div>
//     <motion.div className='about-content-container'
//       initial={{ y: -100, opacity: 0, scale:0.5,  rotateY: 180 }}
//       whileInView={{ y: 0, opacity: 1, scale: 1,  rotateY: 0 }}
//       whileHover={{  scale: 1.1, }}
//       transition={{ duration: 0.5, type: 'spring', stiffness: 500 }}
//       style={{ perspective: 1000 }}
//     >
//      <motion.div 
//      className='about-content mission-section'
//      initial={{ x: -500, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//      whileHover={{background: 'lightblue' }}
//      transition={{ duration: 0.1, type: 'spring', stiffness: 600 }}
//      > 
//      <div className='image-text'>
//       <img src='/vision.jpeg' alt='about' />
//       <h2>Our Vission</h2>
//       </div>
//       {/* <hr /> */}
//       <h3>Al-Risala Organization is a non-profit organization that focuses on education and social activities.
//       it was established in 2017 and has been active in various fields such as education, social, and religion.
//       </h3>
//     </motion.div>

//     <div classname='about-content'>
      
//       <span className='middle-text'>
//       <p>Our Values</p>
//       "we are committed to creating a world where everyone has the opportunity to learn, grow, and thrive."
//       </span>
//     </div>

//     <motion.div className='about-content vission-section'
//       initial={{ x: 500, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       whileHover={{ background: 'lightBlue' }}
//       transition={{ duration: 0.1, type: 'spring', stiffness: 600 }}
//     >
//     <div className='image-text'>
//       <img src='/mission.jpeg' alt='about' />
//       <h2>Our Mision</h2>
//       </div>
//       {/* <hr /> */}
//       <h3>Al-Risala Organization is a non-profit organization that focuses on education and social activities.
//       it was established in 2017 and has been active in various fields such as education, social, and religion.
//       </h3>
//     </motion.div>
//     </motion.div>


//     {/* <div className='about-content-one'>
//       <h2>Our Values</h2>    
//       <hr />
//       <h3>Al-Risala Organization is a non-profit organization that focuses on education and social activities.
//       it was established in 2017 and has been active in various fields such as education, social, and religion.
//       </h3>
//     </div> */}

//     <motion.h2 className='hierarchy' 
//       initial={{ x: -100, opacity: 0 }}
//       whileInView={{ x: 0, opacity: 1 }}
//       animate={{rotate: 360}}
//       transition={{duration: 1, delay:0.3 }}
//     >
//       Organization Hierarchy
//       <span> <hr /></span>
//     </motion.h2>
   

//     <div className='hierarchy-image'>
//       <img src='/hierarchy.png' alt='hierarchy' />
//     </div>
//   </div>
//   )
// }

// export default About

import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'react-feather';
import { useTranslation } from 'react-i18next';

// const achievements = [
//   '5000+ Lives Impacted',
//   '100+ Community Projects',
//   '25+ Countries Reached'
// ];

const teamMembers = [
  { name: 'Yahye', image: '/blankImage.png', position: 'CEO' },
  { name: 'Abdiqani', image: '/blankImage.png', position: 'Media Manager' },
  { name: 'Abdimajid', image: '/blankImage.png', position: 'Vice President' },
  { name: 'Sucad', image: '/blankImage.png',  position: 'Accountant' },
];

const About = () => {
   const [t, i18n] = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-bodyColor bg-bodyBackground">
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src="/education2.jpg" alt="About Us" className="rounded-lg shadow-lg w-full" />
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-lg leading-relaxed">
            {t('about.description')}
           </p>
          
        </motion.div>
      </div>

      {/* Achievements */}
      {/* <div className="grid md:grid-cols-3 gap-12 text-center mt-16">
        {achievements.map((achievement, index) => (
          <motion.div 
            key={index} 
            className="p-6 bg-blue-100 rounded-lg shadow-md"
            whileHover={{ scale: 1.1 }}
          >
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-lg font-semibold">{achievement}</p>
          </motion.div>
        ))}
      </div> */}

      {/* Mission, Vision & Values */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 text-black">
        <motion.div className="p-6 bg-gray-300 rounded-lg shadow-md"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-primary"> {t('about.vision')}</h2>
          <p>
            {t('about.visionText')}
          </p>
        </motion.div>

        <motion.div className="p-6 bg-gray-200 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-primary">{t('about.mission')}</h2>
          <p> {t('about.missionText')} </p>
        </motion.div>

        <motion.div className="p-6 bg-gray-300 rounded-lg shadow-md"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-3 text-primary"> {t('about.values')}</h2>
          <p> {t('about.valuesText')} </p>
        </motion.div>
      </div>

      {/* Organization Hierarchy */}
      <div className="text-center mt-16">
        <motion.h2 
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {t('about.hierarchy')}
          <span className="block mt-4 text-sm border-b-2 border-primary w-full mx-auto">
             {t('about.hierarchyText')}
          </span>
        </motion.h2>
        <img src="/risalaChart.png" alt="Hierarchy" className="mx-auto rounded-lg shadow-lg" />
      </div>

      {/* Team Section */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div key={index} className="p-4 bg-white rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto rounded-full shadow-md mb-4" />
              <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.position}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
