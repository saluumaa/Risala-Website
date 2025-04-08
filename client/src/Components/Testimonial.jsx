import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation} from 'react-i18next'

const Testimonials = () => {
  const [t, i18n] = useTranslation();

  return (
    <motion.section
      className="py-16 text-bodyColor bg-bodyBackground text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center gap-3">
        <span className="w-[200px] h-1 bg-blue-500 z-10"></span>
        <motion.div
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold"> {t('testimonials.title')} </h1>
        
        </motion.div>
      </div>

      <p className="mt-4 max-w-2xl mx-auto">
        {t('testimonials.text')}
      </p>

      <div className="px-8 max-w-6xl mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-auto justify-items-center gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm relative">
          <FaQuoteLeft className="text-3xl text-gray-300 absolute -top-4 -left-4" />
          <p className="italic text-gray-700">
            {t('testimonials.test1')}
          </p>
          <p className="mt-4 font-bold text-gray-900">– {t('testimonials.name1')}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm relative">
          <FaQuoteLeft className="text-3xl text-gray-300 absolute -top-4 -left-4" />
          <p className="italic text-gray-700">
            {t('testimonials.test2')}
          </p>
          <p className="mt-4 font-bold text-gray-900">– {t('testimonials.name2')}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm relative">
          <FaQuoteLeft className="text-3xl text-gray-300 absolute -top-4 -left-4" />
          <p className="italic text-gray-700">
            {t('testimonials.test3')}
          </p>
          <p className="mt-4 font-bold text-gray-900">– {t('testimonials.name3')}</p>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
