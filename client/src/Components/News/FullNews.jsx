import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { eraseNews, fetchNews} from '../../redux/NewsSlice';

import './fullNews.css'

const FullNews = () => {
  const news = useSelector((state) => state.news.news);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, news.length]);

  const newsItem = news.find((news) => news.id === parseInt(id));
  const user = useSelector((state) => state.user.currentUser);
  const [selectedImage, setSelectedImage] = useState(newsItem && newsItem.images && newsItem.images.length > 0 ? newsItem.images[0] : '/hero_image.jpeg');

  if (!newsItem) {
    return (
      <div className='not-found'>
        <h3 style={{ color: 'white', marginTop: '50px' }}>News not found</h3>
      </div>
    );
  }
    const handleImageClick = (images) => {
      setSelectedImage(images);
    };

    const onDelete = (id) => {
      const confirm = window.confirm('Are you sure?');
      if (confirm) {
        dispatch(eraseNews(id));
      }
    }
  
  return (
    <div className='news-page'>
    <div className='full-news-content'>
      <h3>{newsItem.title}</h3>
      <p>{newsItem.date}</p>
    </div>
    <div className='delete-news'>
    {user && user.role === 'admin' && (
              <button className='del-btn'
              onClick={() => onDelete(newsItem.id)}> Delete </button>
            )}
    </div>
    <div className='full-news-wrapper'>
    <div className='news-image'>
      <div className='main-image'>
        <img src={selectedImage} alt='news' className='news-item-img-big' />
      </div>
      <div className='image-thumbnails'>
        {newsItem.images > 0 && newsItem.images.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt='news' 
            className='news-item-img' 
            onClick={() => handleImageClick(image)} 
          />
        ))}
      </div>
    </div>
    <div className="news-body-container">
      <div className='news-body'>
        <p dangerouslySetInnerHTML={{ __html: newsItem.body }} >
        </p>
      </div>
    </div>
    </div>
  </div>
  )
}

export default FullNews