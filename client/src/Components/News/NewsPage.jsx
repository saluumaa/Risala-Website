import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchNews } from '../../redux/NewsSlice';
// import line from './line.png'
import './newsSlider.css';

const NewsPage = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prevIndex) => (prevIndex + 1) % (news?.length || 1));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [news]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? news.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === news.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>
    <div className='news-header'>
      <div className='news-header-img'>
        <img src='/line.png' alt='line' /> 
      </div>
      <div className='news-header-text'>
      <h1> OUR LATEST PROGRAMMES</h1>
      </div>
    </div>
    <div className="slider-container">
  {Array.isArray(news) && news.length > 0 && (
    <div className="news-item" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
      {news.slice().reverse().map((item) => (
        <div className="news-content" key={item.id}>
          <div className='news-img'>
            <img className="news-image" src={item.images[0]} alt="news" />
          </div>
          <div className='news-text'>
            <Link to={`/news/${item.id}`}>
              <h3>{item.title}</h3>
              <p>{item.body.slice(0, 200)}
                <span className="news-readmore">Read more</span>
              </p>
              <h4> date: {item.date}</h4>
            </Link>
          </div>
          <div className='chevron-btns'>
            <button onClick={handlePrevClick} className="prev-btn">
              <FaChevronLeft />
            </button>
            <button onClick={handleNextClick} className="next-btn">
              <FaChevronRight />
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </>
  );
};

export default NewsPage;
