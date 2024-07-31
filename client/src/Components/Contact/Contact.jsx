
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

import './Contact.css'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
        publicKey: 'YOUR_PUBLIC_KEY',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <>
      <div className='contact-main'>
        <h1>Contact Us</h1>
      </div>
      <div className='contact-container'>
      <div className='contact-content-container'>
      <div className='contact-content'>
        <br />
      <h2>Work Hours</h2>
        <h4 style={{fontSize: '1.4rem'}}
        >Saturday - Thursday</h4>
        <span>9:00 AM - 5:00 PM</span>
      </div>
      <hr />

      <div className='contact-content'>
        <h2>Phone Number</h2>
        <p>123456789</p>
      </div>
      <hr />
      
      <div className='contact-content'>
        <h2>Email</h2>
       <h3>
       <p> <a href='mailto:  Alrisala580@gmail.com'>
        Alrisala580@gmail.com
         </a></p>
       </h3>
      </div>
      <hr />
      </div>
      <div className='line-btw'></div>
      <article>
      <h2><span>Get in</span> Touch</h2>
      <div className='contact-content-form'>
        {/* <div className='contact-content-image'>
          <img src={contact_mail} alt='contact' />
        </div> */}
        <form ref={form} onSubmit={sendEmail}>
          <input type='text' placeholder='Name' />
          <input type='email' placeholder='Email' />
          <textarea placeholder='Message'></textarea>     
          <button type='submit' value='Send'>Send</button>
        </form>
      </div> 
      </article>
    </div>
    </>
  )
}

export default Contact