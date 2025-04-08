import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchNews } from '../../redux/NewsSlice';
import formDate from '../../utils/dateFormatter'



import './newsSlider.css';

const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? news.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === news.length - 1 ? 0 : prevIndex + 1));
  };

  return (
<>
{/* News Header Section */}
<motion.div
  className="mt-16 "
  initial={{ x: -230, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ duration: 1.5, type: 'spring', stiffness: 150 }}
>
  <motion.div
    className="news-header-text"
    initial={{ opacity: 0, x: -10, y: -100 }}
    animate={{ opacity: 1, y: -5, x: -4 }}
  >
    <div className="flex items-center gap-3 ">
      <span className="w-[200px] h-1 bg-blue-500 "></span>
      <h1 className="text-4xl font-bold ">OUR LATEST PROGRAMMES</h1>
    </div>
  </motion.div>
</motion.div>

{/* Slider Container */}

<div className="bg-bodyBackground text-bodyColor relative overflow-hidden w-full h-[400px] mx-4 flex items-center justify-center">
  {news?.length > 0 && (
    <>
      {/* News Items */}
      <div
        className="flex items-center transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease' }}
      >
        {news.slice().reverse().map((item) => (
          <motion.div
            className="news-content flex-shrink-0 w-full p-4"
            key={item._id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Flex container for image and text */}
            <div className="flex items-center relative">
              {/* Image on the left */}
              <div className="relative ">
                <img
                  className="w-full  object-cover rounded-2xl"
                  src={`https://risala-website.onrender.com/${item.images[0]}`}
                  // src={`http://localhost:8800/${item.images[0]}`}
                  alt="news"
                />
              </div>

               {/* Chevron Buttons Positioned at the Bottom */}
            <div className="absolute bottom-0 left-0 transform -translate-x-3/2 flex justify-between w-[20%] p-2 z-10">
              <button
                onClick={handlePrevClick}
                className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <FaChevronLeft className="text-gray-800" />
              </button>
              <button
                onClick={handleNextClick}
                className="bg-blue-500 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <FaChevronRight className="text-gray-800" />
              </button>
            </div>

              {/* Text content on the right */}
              <div className="text-white absolute md:left-3/4 top-1/5 bg-primary opacity-90 p-4 rounded-tr-lg rounded-bl-lg w-1/2 md:w-full">
                <Link to={`/news/${item._id}`} className="flex flex-col gap-2 justify-center">
                  <h3 className="text-2xl font-bold hover:text-green-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  {/* <p className="mt-2 w-[80%]" dangerouslySetInnerHTML={{ __html: item.body.slice(0, 120) }}></p> */}
                  <button className="mt-4 flex items-center text-bodyColor-500 hover:text-blue-600 transition-colors duration-300">
                    Read more
                    <span className="read-more-arrow ml-2">
                      <FaArrowRight />
                    </span>
                  </button>
                </Link>
              </div>
            </div>

           
          </motion.div>
        ))}
      </div>
    </>
  )}
</div>




</>
  );
};

export default NewsPage;
