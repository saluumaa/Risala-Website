import React from 'react'
import Hero from '../Hero/Hero'
import Service from '../Services/Service'
import NewsPage from '../News/NewsPage'
import { Outlet } from 'react-router-dom'
import Impact from '../Impact'
import Testimonials from '../Testimonial'
// import Donate from '../Donate/Donate'

const Home = () => {
  return (
    <div>
      <Hero />
      <NewsPage />
      <Service />
      <Impact />
      <Testimonials />
    <Outlet />
    </div>
  )
}

export default Home