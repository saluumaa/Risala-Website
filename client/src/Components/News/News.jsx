import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews} from '../../redux/NewsSlice';
import { Link } from 'react-router-dom';
import './News.css';

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  // console.log('News:', news);
  const user = useSelector((state) => state.user.user);
  
  useEffect(() => {
    dispatch(fetchNews()); 
  }, [dispatch]);



  return (
    <div className='news-page-frame'>
      {user && user.role === 'admin' && (
        <div className='add-delete-btn add-btn'>
          <Link to='/addnews'>
            <button
            >Add News</button>
          </Link>
        </div>
      )}
      {Array.isArray(news) && news.length > 0 && news.slice().reverse().map((item) => (
        <Link to={`/news/${item.id}`} className='news-link'>
        <div className='news-wrapper' key={item.id}>
              <img src={item.images?.[0]
              } alt='news' className='post-image' />
          <div className='news-page-wrapper'>
            <h1>{item.title}</h1>
            <p className='item-body'  >
              {item.body.length > 200 ? item.body.slice(0, 200) + '...' : item.body}
              <span>Readmore</span>
            </p>
            <h5>Date: {item.date}</h5>
          </div>
        </div>
        </Link>
        
      ))}
    </div>
  );
};

export default News;


