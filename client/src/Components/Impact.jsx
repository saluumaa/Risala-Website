import { FaUsers, FaBookOpen, FaGlobeAfrica } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation} from 'react-i18next'

const Impact = () => {
  const [t, i18n] = useTranslation();

  return (
    <motion.section className="py-16 bg-bodyBackground text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
        <div className='flex items-center gap-3'>
        <span className='w-[200px] h-1 bg-blue-500 z-10 '></span>
        <motion.div className='text-2xl font-bold'
            initial={{ opacity: 0, x:-50 }}
            animate={{ opacity: 1,  x: 0 }}
        >
        <h1 className='text-4xl font-bold'> {t('impact.title')} </h1>
        </motion.div>
      </div>
      <p className="mt-4 max-w-2xl mx-auto">
        {t('impact.text')}
      </p>
      <div className="max-w-6xl px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-items-center">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md w-60 flex flex-col items-center">
          <FaUsers className="text-5xl text-primary" />
          <h3 className="text-4xl font-bold text-blue-600 mt-3">500+</h3>
          <p className="mt-2 text-gray-700"> {t('impact.liveText')} </p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-md w-60 flex flex-col items-center">
          <FaBookOpen className="text-5xl text-primary" />
          <h3 className="text-4xl font-bold text-green-600 mt-3">100+</h3>
          <p className="mt-2 text-gray-700"> {t('impact.comText')} </p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md w-60 flex flex-col items-center">
          <FaGlobeAfrica className="text-5xl text-primary" />
          <h3 className="text-4xl font-bold text-yellow-600 mt-3">1000+</h3>
          <p className="mt-2 text-gray-700"> {t('impact.peoText')} </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Impact;
