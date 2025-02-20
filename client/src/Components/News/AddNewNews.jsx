import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../utils/apiRequest';
// import {createNews} from '../../redux/NewsSlice';
import Editor from '../Editor';
import './News.css';

const AddNewNews = () => {
  const [body, setBody] = useState('');
  const [imageFile, setImageFile] = useState([]); 

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== 'admin') {
      alert('User is not authorized to add news.');
      return;
    }

    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('body', body);
    formData.append('date', e.target.date.value);
    formData.append('place', e.target.place.value);
    formData.append('target', e.target.target.value);

    if (imageFile) {
      for (let i = 0; i < imageFile.length; i++) {
        formData.append('images', imageFile[i]);
      }
    }

    try {
      const response = await apiRequest.post('/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if(response.status === 201) {
        alert('News added successfully');
        navigate('/news');
      }
    } catch (error) {
      console.error('Add news failed:', error);
    }
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files);
  }

  return (
    <div className='add-form-container'>
      <form onSubmit={handleSubmit} className='add-new-form' >
        <input type="text" name='title' placeholder='title' />
        <input type="date" name='date'  />
        <input type="file" name='images' onChange={handleImageChange} multiple
          accept="image/png, image/jpeg, image/jpg, image/gif"
        />
        <input type="text" name="place" placeholder='place' />
        <input type="text" name="target" placeholder='target' />
        <input type="text" name="author" placeholder='author' />
        <Editor value={body} onChange={setBody} />
        <button
          type='submit'
          className='btn submit-btn'
          style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', marginTop: '20px' }}>
          Add News
        </button>
      </form>
    </div>
  );
};

export default AddNewNews;
