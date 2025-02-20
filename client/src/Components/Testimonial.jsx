import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.section className="py-16 text-bodyColor bg-bodyBackground text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8}}
    >
      <div className='flex items-center gap-3'>
        <span className='w-[200px] h-1 bg-blue-500 z-10 '></span>
        <motion.div className='text-2xl font-bold'
            initial={{ opacity: 0, x:-100 }}
            animate={{ opacity: 1,  x: 0 }}
        >
        <h1 className='text-4xl font-bold'> Voices Of Change </h1>
        </motion.div>
      </div>
      <p className="mt-4  max-w-2xl mx-auto">
        Hear from the women and communities whose lives have been transformed through our programs.
      </p>
      <div className="px-8 max-w-6xl mt-8 grid grid-cols-2 md:grid-cols-3 mx-auto gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm relative">
          <FaQuoteLeft className="text-3xl text-gray-300 absolute -top-4 -left-4" />
          <p className="italic text-gray-700">
            "This NGO changed my life. I was given the opportunity to learn skills that made me financially independent."
          </p>
          <p className="mt-4 font-bold text-gray-900">- Amina H.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm relative">
          <FaQuoteLeft className="text-3xl text-gray-300 absolute -top-4 -left-4" />
          <p className="italic text-gray-700">
            "Thanks to the awareness campaigns, I now understand my rights and how to stand up for myself."
          </p>
          <p className="mt-4 font-bold text-gray-900">- Fatima K.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm relative">
          <FaQuoteLeft className="text-3xl text-gray-300 absolute -top-4 -left-4" />
          <p className="italic text-gray-700">
            "Thanks to the awareness campaigns, I now understand my rights and how to stand up for myself."
          </p>
          <p className="mt-4 font-bold text-gray-900">- Fatima K.</p>
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
