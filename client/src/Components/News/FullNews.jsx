import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import apiRequest from '../../utils/apiRequest';
import {useParams, useNavigate} from 'react-router-dom'
import formDate from '../../utils/dateFormatter'
import { useSelector } from 'react-redux'

import './fullNews.css'

const FullNews = () => {
  const [newsInfo, setNewsInfo] = useState(null);
  const { id } = useParams();
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (id) {
      apiRequest.get(`/news/${id}`)
        .then((response) => {
          setNewsInfo(response.data);
        })
        .catch((error) => {
          console.error('Error fetching news:', error);
        });
    }
  }, [id]);

  const [selectedImage, setSelectedImage] = useState('/hero_image.jpeg');

  useEffect(() => {
    if (newsInfo && newsInfo.images && newsInfo.images.length > 0) {
      setSelectedImage(newsInfo.images[0]);
    }
  }, [newsInfo]);

  if (!newsInfo) {
    return <div>Loading...</div>;
  }
    const handleImageClick = (images) => {
      setSelectedImage(images);
    };

    const onDelete = (id) => {
      apiRequest.delete(`/news/${id}`)
        .then(() => {
          navigate('/news');
        })
        .catch((error) => {
          console.error('Error deleting news:', error);
        });
    }

    

  return (
    <div className='news-page'>
    <div className='full-news-content'>
      <h3>{newsInfo.title}</h3>
      <p>{formDate(newsInfo.date)}</p>
    </div>
    <div className='delete-news'>
    {user && user.role === 'admin' && (
              <button className='del-btn'
              onClick={() => onDelete(newsInfo._id)}> Delete </button>
            )}
    </div>
    <div className='full-news-wrapper'>
    <div className='news-image'>
      <div className='main-image'>
        {/* <img src= {`https://risala-website.onrender.com/${selectedImage}`} */}
        <img src={`https://localhost:8800/${selectedImage}`}
         alt='news' className='news-item-img-big' />
      </div>
      <motion.div className='image-thumbnails'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {newsInfo?.images.length > 0 && newsInfo.images.map((image, index) => (
          <img 
            key={index} 
            // src={`https://risala-website.onrender.com/${image}`}
            src={`https://localhost:8800/${image}`}
            alt='news' 
            className='news-item-img' 
            onClick={() => handleImageClick(image)} 
          />
        ))}
      </motion.div>
    </div>
    <div className="news-body-container">
      <motion.div className='news-body'
        initial={{ X: -1000, opacity: 0 }}
        whileInView={{x:0, opacity: 1}}
        transition={{ delay: 0.5, duration: 0.5, ease: 'easeInOut' }}
      >
        <p dangerouslySetInnerHTML={{ __html: newsInfo.body }} >
        </p>
      </motion.div>
    </div>
    </div>
  </div>
  )
}

export default FullNews