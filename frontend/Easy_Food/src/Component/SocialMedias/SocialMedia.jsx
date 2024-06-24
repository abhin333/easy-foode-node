import React from 'react'
import './SocialMedia.css'
import instagram from "../../assets/logo/instagram.png"
import facebook from "../../assets/logo/facebook.png"
import google from "../../assets/logo/search.png"


const SocialMedia = () => {
  return (
    <div>
        <div className="icons">
        <div className="instagram">
           <img src={instagram} alt="instagram" className='instagram'/>
        </div>
        <div className="facebook">
            <img src={facebook} alt="facebook" className='facebook' />
        </div>
        <div className="google">
            <img src={google} alt="google"  className='google'/>
        </div>
        </div>
    </div>
  )
}

export default SocialMedia