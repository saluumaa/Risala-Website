import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {FaFacebook, FaYoutube, FaTiktok} from 'react-icons/fa'
import { fetchNews} from '../../redux/NewsSlice';
import './Hero.css'
import Donate from '../Donate/Donate'
import { useSelector, useDispatch } from 'react-redux';

const Hero = () => {
  // const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);

  const images = news.flatMap((item) => item.images > 0 ? item.images: ['/hero_image.jpeg']);

  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className='hero-wrapper' >
			<div className='image-wrapper'>
				<img src={
          images[index]
        } alt={`Organization Pictures  ${index + 1 }`} />

        <div className='image-overlay'>
          <p>
           Empowering Youth Through Education and building a better future together
            and providing a platform for the youth to develop their skills and talents.
          </p>
        <section className='social-icons'>
          <div>
          <Link to="/about"><button className='btn' style={{padding: "9px 15px"}} >Learn More</button></Link>
          </div>
          <div>
          <button>Follow Us  
          <a href='https://www.facebook.com/AlrisalaOrganization/' target='_blank' rel="noopener noreferrer" style={{paddingLeft: '10px'}} ><FaFacebook /></a>
          <a href='https://www.tiktok.com/@alrisalaorg' target='_blank' rel="noopener noreferrer"><FaTiktok /></a>
          <a href='https://www.youtube.com/channel/UCQ8aXs3FQxXp3zY6t9XqC6g' target='_blank' rel="noopener noreferrer"><FaYoutube /></a>
          </button>
          </div>
          
      </section>
        </div>
        </div>
      <Donate className="donate" />
     </section>
  )
}

    

export default Hero