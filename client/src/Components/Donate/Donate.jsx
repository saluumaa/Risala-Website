import React from 'react'
import './Donate.css'
import { Link } from 'react-router-dom'

const Donate = () => {
  return (

        <div className='donate-wrapper'>
            <div className='donate-content one'>
                <h2>Changed Over</h2>       
                <p>
                <span style={{fontWeight:'700', fontSize: '20px', paddingRight:'5px', color: 'white'}}>1000</span>
                individuals in the community through our programs
                </p>
            </div>
            <div className='donate-content two'>
                <h2>Donate Money</h2>            
                <p>
                  Help us continue our mission to build better future together.
                </p>
                <button className='btn donate-btn'>Donate</button>
            </div>
            <div className='donate-content three'>
                <h2>
                    Be a volunteer
                </h2>
                <p>
                    Join our team and be a part of the change.
                </p>
                <Link to='/volunteer'> <button className='btn donate-btn vol-btn'>Volunteer</button> </Link>
            </div>
        </div>

  )
}

export default Donate