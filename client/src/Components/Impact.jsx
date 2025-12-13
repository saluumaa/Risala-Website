import { FaUsers, FaBookOpen, FaGlobeAfrica } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'

const Impact = () => {
  const [t, i18n] = useTranslation();

  return (
    <motion.section className="py-16 bg-bodyBackground text-center"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className='flex items-center gap-3'>
        <span className='w-[200px] h-1 bg-blue-500 z-10 '></span>
        <motion.div className='text-2xl font-bold'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className='text-4xl font-bold text-gray-500 dark:text-gray-100'> {t('impact.title')} </h1>
        </motion.div>
      </div>
      <p className="mt-4 max-w-2xl text-gray-500 dark:text-gray-100 mx-auto">
        {t('impact.text')}
      </p>
      <div className="max-w-6xl px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-items-center">
        <motion.div className="bg-blue-100 dark:bg-blue-900/20 p-6 rounded-lg shadow-md w-60 flex flex-col items-center transition-colors duration-300"
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaUsers className="text-5xl text-primary-600 dark:text-primary-400" />
          <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-3">500+</h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300"> {t('impact.liveText')} </p>
        </motion.div>
        <motion.div className="bg-green-100 dark:bg-green-900/20 p-6 rounded-lg shadow-md w-60 flex flex-col items-center transition-colors duration-300"
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaBookOpen className="text-5xl text-green-600 dark:text-green-400" />
          <h3 className="text-4xl font-bold text-green-600 dark:text-green-400 mt-3">100+</h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300"> {t('impact.comText')} </p>
        </motion.div>
        <motion.div className="bg-yellow-100 dark:bg-yellow-900/20 p-6 rounded-lg shadow-md w-60 flex flex-col items-center transition-colors duration-300"
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaGlobeAfrica className="text-5xl text-yellow-600 dark:text-yellow-400" />
          <h3 className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mt-3">1000+</h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300"> {t('impact.peoText')} </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Impact;
