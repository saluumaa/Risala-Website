import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBullseye, FaEye, FaHandHoldingHeart, FaUserTie, FaUsers, FaSitemap, FaChartLine } from 'react-icons/fa';

const teamMembers = [
  { name: 'Yahye', image: '/blankImage.png', position: 'CEO' },
  { name: 'Abdiqani', image: '/blankImage.png', position: 'Media Manager' },
  { name: 'Abdimajid', image: '/blankImage.png', position: 'Vice President' },
  { name: 'Sucad', image: '/blankImage.png', position: 'Accountant' },
];

// Professional Hierarchy Node Component
const HierarchyNode = ({ title, role, icon: Icon, children, isRoot = false }) => (
  <div className="flex flex-col items-center">
    <motion.div
      className={`
        relative z-10 p-4 rounded-xl shadow-lg border-2 
        ${isRoot ? 'bg-primary-600 border-primary-600 text-white' : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'}
        min-w-[220px] max-w-[250px] text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      `}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className={`mb-2 flex justify-center ${isRoot ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`}>
        {Icon && <Icon className="text-2xl" />}
      </div>
      <h4 className={`font-bold text-lg ${isRoot ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
        {title}
      </h4>
      {role && (
        <p className={`text-sm mt-1 ${isRoot ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
          {role}
        </p>
      )}
    </motion.div>

    {children && (
      <div className="flex flex-col items-center w-full">
        {/* Vertical Line from Parent */}
        <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

        {/* Horizontal Line Container */}
        <div className="flex justify-center w-full relative">
          {/* The Horizontal Line itself - spans across children */}
          {React.Children.count(children) > 1 && (
            <div className="absolute top-0 h-0.5 bg-gray-300 dark:bg-gray-600 w-[calc(100%-220px)]"></div>
          )}

          {/* Children Container */}
          <div className="flex gap-8 pt-0 justify-center w-full">
            {React.Children.map(children, (child) => (
              <div className="flex flex-col items-center relative">
                {/* Vertical Line to Child */}
                <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

const About = () => {
  const [t] = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-20 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/education2.jpg"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/80 mix-blend-multiply" />
        </div>
        <div className="relative container-custom h-full flex items-center justify-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-heading">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light">
              Empowering communities and building a sustainable future since 2017
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-20">
        {/* Story Section */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-100 dark:bg-primary-900/30 rounded-2xl transform -rotate-2"></div>
              <img
                src="/about_image.PNG"
                alt="Our Story"
                className="relative rounded-2xl shadow-xl w-full object-cover h-[400px] z-10"
              />
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-left mb-6 text-gray-900 dark:text-white">Who We Are</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t('about.description')}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Al-Risala Organization is a non-profit dedicated to education and social development.
              Established in 2017, we have been active in various fields, striving to create
              positive change through sustainable development and community empowerment across the globe.
            </p>
          </motion.div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              title: t('about.vision'),
              text: t('about.visionText'),
              icon: <FaEye className="w-8 h-8" />,
              color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            },
            {
              title: t('about.mission'),
              text: t('about.missionText'),
              icon: <FaBullseye className="w-8 h-8" />,
              color: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400"
            },
            {
              title: t('about.values'),
              text: t('about.valuesText'),
              icon: <FaHandHoldingHeart className="w-8 h-8" />,
              color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${item.color} transform rotate-3 transition-transform group-hover:rotate-6`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Hierarchy Section - Professional Code-Based Chart */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="section-title mb-4 text-gray-900 dark:text-white">{t('about.hierarchy')}</h2>
            <p className="section-subtitle max-w-2xl mx-auto mb-16 text-gray-600 dark:text-gray-300">
              {t('about.hierarchyText')}
            </p>

            <div className="overflow-x-auto pb-12">
              <div className="min-w-[1000px] flex justify-center px-4">
                <div className="flex flex-col items-center">
                  {/* Level 1: Board */}
                  <HierarchyNode title="Board of Directors" role="Governance" icon={FaUsers} isRoot={true}>
                    {/* Level 2: Executive Director */}
                    <HierarchyNode title="Executive Director" role="Management" icon={FaUserTie}>
                      {/* Level 3: Departments */}
                      <div className="flex gap-16">
                        {/* Branch 1 */}
                        <HierarchyNode title="Program Manager" role="Operations" icon={FaSitemap}>
                          <div className="flex gap-8">
                            <HierarchyNode title="Education Head" role="Department" />
                            <HierarchyNode title="Health Head" role="Department" />
                          </div>
                        </HierarchyNode>

                        {/* Branch 2 */}
                        <HierarchyNode title="Admin & Finance" role="Support" icon={FaChartLine}>
                          <div className="flex gap-8">
                            <HierarchyNode title="HR Manager" role="Department" />
                            <HierarchyNode title="Accountant" role="Department" />
                          </div>
                        </HierarchyNode>
                      </div>
                    </HierarchyNode>
                  </HierarchyNode>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="section-title mb-12 text-gray-900 dark:text-white">Meet Our Leadership</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="font-bold">Connect</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 relative bg-gray-100 dark:bg-gray-800">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
