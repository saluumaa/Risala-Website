// import React, { useRef } from 'react';

// import emailjs from '@emailjs/browser';

// import './Contact.css'

// const Contact = () => {
//   const form = useRef();

//   const sendEmail = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, {
//         publicKey: 'YOUR_PUBLIC_KEY',
//       })
//       .then(
//         () => {
//           console.log('SUCCESS!');
//         },
//         (error) => {
//           console.log('FAILED...', error.text);
//         },
//       );
//   };
//   return (
//     <>
//       <div className='contact-main'>
//         <h1>Contact Us</h1>
//       </div>
//       <div className='contact-container'>
//       <div className='contact-content-container'>
//       <div className='contact-content'>
//         <br />
//       <h2>Work Hours</h2>
//         <h4 style={{fontSize: '1.4rem'}}
//         >Saturday - Thursday</h4>
//         <span>9:00 AM - 5:00 PM</span>
//       </div>
//       <hr />

//       <div className='contact-content'>
//         <h2>Phone Number</h2>
//         <p>123456789</p>
//       </div>
//       <hr />
      
//       <div className='contact-content'>
//         <h2>Email</h2>
//        <h3>
//        <p> <a href='mailto:  Alrisala580@gmail.com'>
//         Alrisala580@gmail.com
//          </a></p>
//        </h3>
//       </div>
//       <hr />
//       </div>
//       <div className='line-btw'></div>
//       <article>
//       <h2><span>Get in</span> Touch</h2>
//       <div className='contact-content-form'>
//         {/* <div className='contact-content-image'>
//           <img src={contact_mail} alt='contact' />
//         </div> */}
//         <form ref={form} onSubmit={sendEmail} className='contact-form' >
//           <input type='text' placeholder='Name' />
//           <input type='email' placeholder='Email' />
//           <textarea placeholder='Message'></textarea>     
//           <button type='submit' value='Send'>Send</button>
//         </form>
//       </div> 
//       </article>
//     </div>
//     </>
//   )
// }

// export default Contact


import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Twitter } from 'react-feather';
import ContactForm from './ContactForm';

export default function ContactSection() {
  return (
    <section className="py-20 text-bodyColor" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg font-bold">Get in touch with our team</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
            <ContactForm />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Office Location</h4>
                  <p className="text-blue-500">Borama, Awdal, Somaliland</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-blue-500">+252 (63) 445-2812</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-blue-600">contact@alrisala.org</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Business Hours</h4>
                  <p className="text-blue-500">Saturday - Thursday: 9:00 AM - 5:00 PM</p>
                  <p className="text-blue-500">Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  <Facebook />
                </a>
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  <Youtube />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-500">
                  <Twitter />
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}