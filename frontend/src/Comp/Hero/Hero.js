import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png';
import arrow from '../Assets/arrow.png';
import hero_image from '../Assets/home_img.png';

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>NEW ARRIVALS ONLY</h2>
            <div className='hero-hand-icon'>
                <p>New <img src={hand_icon} alt=''/></p>
                
                <p>Collections</p>
                <p>For everyone</p>
            </div>
            <div className='hero-latest-btn'>
              <div>Lattest Collections</div>
              <img src={arrow} alt=''/>
            </div>
        </div>
        <div className='hero-right'>
          <img src={hero_image} alt=''/>
        </div>

      
    </div>
  )
}

export default Hero
