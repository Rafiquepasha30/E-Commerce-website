import React from 'react'
import './NewsLatter.css'

const NewsLatter = () => {
  return (
    <div className='newslatter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newslatter and stay updated</p>
        <div>
            <input type='email' placeholder='enter your mail id' />
            <button>Subscribe</button>
        </div>
      
    </div>
  )
}

export default NewsLatter
