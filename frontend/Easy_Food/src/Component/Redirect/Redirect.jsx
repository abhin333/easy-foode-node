import React, { useEffect, useState } from 'react'
import './Redirect.css'
import delivery from"../../assets/image/delivery.png"
import { useNavigate } from 'react-router-dom'
const Redirect = () => {
    const navigate=useNavigate()
    const [count, setCount] = useState(5);
    useEffect(() => {
        const countdownInterval = setInterval(() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }, 1000);
    
        return () => clearInterval(countdownInterval);
      }, [count]);
    setTimeout(()=>{
        navigate('/items')
    },5000)
    
  return (
    <div>
        <div className="container">
            <div className="delivery-img">
                <img src={delivery} alt="delivery" className='del' loading='lazy'/>
            </div>
            <p className='p'><span className='s'>"Order placed! Your item will be delivered within 1 hour. </span>Redirect:{count}</p>
        </div>
    </div>
  )
}

export default Redirect