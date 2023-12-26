import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SplashScreen.css'
import { motion } from "framer-motion"
import food from "../../assets/image/Food.png"
import tittle from "../../assets/image/Fast.. 1.png"
import arrow from "../../assets/image/image 1.png"
import bike from "../../assets/image/pizza-deliver 1.png"


const SplashScreen = () => {
const navigate=useNavigate();
  const clickHandler=()=>{
  navigate('/signup')
  }
    return (

    <div>
        <motion.div className="containers"
        initial={{x:'-100vw'}}
        animate={{x:0}}
        transition={{delay:.1,type:'spring',stiffness:120}}

        >
            
            <div className="image-div">
            <div className="header-image">
                <img src={food} alt="burgger-image" className='burger-img' />
            </div>
            </div>
            
            <div className="tittle-name">
                <img src={tittle} alt="title" />
            </div>
            <motion.div className="arrow-icon" onClick={clickHandler}
            initial={{x:'-250'}}
            animate={{x:0}}
            transition={{delay:.3,duration:5,type:'spring'}}
            >
                <img src={arrow} alt="arrow" />
            </motion.div>
            <motion.div className="bike"
             initial={{ x: '-0%' }}
             animate={{ x: '200%' }}
             transition={{ ease: 'linear', duration: 5, repeat: Infinity }}
            >
                <img className='bikes'src={bike} alt="bike" />
             </motion.div>
             </motion.div>
           
        
    </div>
  )
}

export default SplashScreen