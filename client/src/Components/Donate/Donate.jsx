import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUniversity, FaMobileAlt, FaHandHoldingHeart, FaCheckCircle, FaCopy, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DonatePage = () => {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ text, fieldId }) => (
    <button
      onClick={() => handleCopy(text, fieldId)}
      className="ml-2 p-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative group"
      title="Copy to clipboard"
    >
      {copiedField === fieldId ? <FaCheck className="text-green-500" /> : <FaCopy />}
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {copiedField === fieldId ? 'Copied!' : 'Copy'}
      </span>
    </button>
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-20 pb-12">
      {/* Hero Section */}
      <div className="container-custom mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary-600 dark:text-primary-400 mb-6">
              Support a Cause That Matters
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Your donation fuels life-changing programs in <strong>Health</strong>, <strong>Education</strong>, and <strong>Livelihood Support</strong>.
              Together, we empower communities and build a brighter future.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Bank Transfer Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-blue-600 p-6 text-white flex items-center gap-4">
              <FaUniversity className="text-4xl" />
              <div>
                <h2 className="text-2xl font-bold">Bank Transfer</h2>
                <p className="text-blue-100">Direct deposit to our account</p>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                <span className="text-gray-500 dark:text-gray-400">Bank Name</span>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Dahabshiil Bank</span>
                  <CopyButton text="Dahabshiil Bank" fieldId="bankName" />
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                <span className="text-gray-500 dark:text-gray-400">Account Name</span>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Risala Organisation</span>
                  <CopyButton text="Risala Organisation" fieldId="accName" />
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
                <span className="text-gray-500 dark:text-gray-400">Account Number</span>
                <div className="flex items-center">
                  <span className="font-bold text-xl text-primary-600 dark:text-primary-400">1234567890</span>
                  <CopyButton text="1234567890" fieldId="accNum" />
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500 dark:text-gray-400">Swift Code</span>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">DAHBSOSM</span>
                  <CopyButton text="DAHBSOSM" fieldId="swift" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Money Card */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-green-600 p-6 text-white flex items-center gap-4">
              <FaMobileAlt className="text-4xl" />
              <div>
                <h2 className="text-2xl font-bold">Mobile Money</h2>
                <p className="text-green-100">Zaad & eDahab Services</p>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">Z</div>
                  <span className="font-semibold text-gray-900 dark:text-white">Zaad Service</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-xl text-gray-900 dark:text-white">063-4452812</span>
                  <CopyButton text="0634452812" fieldId="zaad" />
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">e</div>
                  <span className="font-semibold text-gray-900 dark:text-white">eDahab Service</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-xl text-gray-900 dark:text-white">065-4452812</span>
                  <CopyButton text="0654452812" fieldId="edahab" />
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                * Please use "Donation" as the reference when sending money.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Alternative Donation */}
        <motion.div
          className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FaHandHoldingHeart className="text-6xl mx-auto mb-6 text-white/90" />
          <h2 className="text-3xl font-bold mb-4">Want to support in other ways?</h2>
          <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
            We also provide an eLearning platform. Purchase a course to learn new skills,
            and a portion of the proceeds goes directly to our community projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/volunteer">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Become a Volunteer
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">Why Donate to Risala?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              "100% Transparent Funding",
              "Direct Community Impact",
              "Regular Progress Updates"
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                <FaCheckCircle className="text-green-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
