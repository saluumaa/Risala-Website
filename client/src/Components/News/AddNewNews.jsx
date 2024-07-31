import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNews } from '../../redux/NewsSlice';
import Editor from '../Editor';
import './News.css';

const AddNewNews = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState([]); 

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body || !date) {
      alert('Please fill in all fields');
      return;
    }

    if (!user || !user.isAuthenticated) {
      alert('User is not authenticated. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('news[title]', title);
    formData.append('news[body]', body);
    formData.append('news[date]', date);

    const uniqueFiles = Array.from(new Set(imageFile));
    if (uniqueFiles.length > 0) {
      for (let i = 0; i < uniqueFiles.length; i++) {
        formData.append('news[images][]', uniqueFiles[i]);
      }
    }

    console.log('FormData:', formData);
    console.log('Image files:', imageFile);
    try {
      await dispatch(createNews(formData));
      setTitle('');
      setBody('');
      setDate('');
      setImageFile([]); // Clear image files after submission
    } catch (error) {
      console.error('Error adding news:', error);
      alert('Error adding news. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFile((prevFiles) => {
      // Create a Set to avoid duplicates
      const uniqueFiles = new Set([...prevFiles, ...files]);
      return Array.from(uniqueFiles);
    });
  };

  return (
    <div className='add-form-container'>
      <form onSubmit={handleSubmit} >
        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type='file' multiple onChange={handleImageChange} />
        <input type='date' placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)} />
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
