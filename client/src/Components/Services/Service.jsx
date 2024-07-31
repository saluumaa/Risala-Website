import React from 'react'
import './Service.css'
import '../News/News.css'
import { Link } from 'react-router-dom'

const Service = () => {
  return (
    <div className='services'>
      {/* <h1>OUR SERVICES</h1> 
        <hr /> */}
      <div className='news-header service-header'>
      <div className='news-header-img'>
        <img src='/line.png' alt='line' /> 
      </div>
      <div className='news-header-text'>
      <h1> OUR SERVICES</h1>
      </div>
    </div>
      <div className='services-container'>
        <div className='services-content'>
          <Link to='/education'>
          <div className='services-img'>
            <img src='/health_section.jpg' alt='health sector' />
          </div>
          <div className='services-text'>
          <h2>Education</h2>
          <p>
            We provide free education to the children of the community. We believe that education is the key to success and we want to give every child a chance to succeed.
          </p>
          </div>
          </Link>
        </div>
        <div className='services-content'>
          <Link to='/awareness'>
         <div className='services-img'>
            <img src='/health_section.jpg' alt='health sector' />
          </div>
          <div className='services-text'>
          <h2>Health</h2>
          <p>
            We provide free health services to the community. We believe that health is wealth and we want to give every child a chance to succeed.
          </p>
          </div>
          </Link>
        </div>
        <div className='services-content'>
          <Link to='/empowerment'>
        <div className='services-img'>
            <img src='/health_section.jpg' alt='health sector' />
          </div>
          <div className='services-text'>
          <h2>Food</h2>
          <p>
            We provide free food to the community. We believe that food is the key to success and we want to give every child a chance to succeed.
          </p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Service