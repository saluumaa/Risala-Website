import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews} from '../../redux/NewsSlice';
import formDate from '../../utils/dateFormatter'
import { Link } from 'react-router-dom';
import './News.css';

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const user = useSelector((state) => state.user.currentUser);
  
  useEffect(() => {
    dispatch(fetchNews()); 
  }, [dispatch]);


  return (
    <>
          {/* {user && user.role === 'admin' && (
        <div className='add-delete-btn add-btn'>
          <Link to='/addnews'>
            <button
            >Add News</button>
          </Link>
        </div>
      )} */}
    <div className='news-page-frame'>
  
      {news?.length > 0 && news.slice().reverse().map((item, index) => (
        <Link to={`/news/${item._id}`} className='news-link'>
        <motion.div className={`news-wrapper ${index % 2 !== 0 ? 'reverse-layout' : ''}`} key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="news-img-date">
              {/* <img src={`https://risala-website.onrender.com/${item.images[0]}`} */}
              <img src={`http://localhost:8800/${item.images[0]}`}          
              alt='news' className='post-image' />
              {/* <div className='date'> */}
                <h5>
                {formDate(item.createdAt)}
                </h5>
                {/* </div> */}
          </div>

          <div className='news-page-wrapper'>
            <h1>{item.title}</h1>
            <p className='news-item-body' dangerouslySetInnerHTML={
               {__html: item.body.length > 80 ? item.body.slice(0, 80) + '...' : item.body}
            }></p>
            <span className='news-readmore'>Readmore</span>
            
          </div>
        </motion.div>
        </Link>
        
      ))}
    </div>
    </>
  );
};

export default News;


