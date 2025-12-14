import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaImage } from 'react-icons/fa';
import { fetchNews } from '../../redux/NewsSlice';

const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="container-custom mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Latest News & Updates
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay informed about our latest activities, programmes, and community impact stories.
          </motion.p>
        </div>

        {news?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice().reverse().map((item, index) => (
              <motion.div
                key={item._id || item.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {item.images && item.images.length > 0 ? (
                    <img
                      // src={`http://localhost:8800/${item.images[0]}`}
                      src={`https://risala-website.onrender.com/${item.images[0]}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <FaImage className="text-4xl" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    News
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                    {item.place && (
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        {item.place}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <Link to={`/news/${item._id || item.id}`}>
                      {item.title}
                    </Link>
                  </h3>

                  <div
                    className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 prose dark:prose-invert text-sm"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  ></div>

                  <div className="mt-auto">
                    <Link
                      to={`/news/${item._id || item.id}`}
                      className="inline-flex items-center text-primary-600 dark:text-primary-400 font-bold hover:underline"
                    >
                      Read Full Story <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">No news articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
