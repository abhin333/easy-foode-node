import { Avatar } from '@mui/material'
import ShortTextIcon from "@mui/icons-material/ShortText";
import React, { useContext } from 'react'
import './View.css'
import Card from '../Card/Card';
import Cart from '../cart/Cart';
import { useNavigate } from 'react-router-dom';
import {motion } from 'framer-motion';

const View = () => {

const navigate= useNavigate()
const goHome=()=>{
navigate('/items')
}


  return (
    <div>
        <motion.div className="main3"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:2}}
        >
        <div className="header2">
          <div className="icons2" onClick={goHome}>
            <ShortTextIcon/>
          </div>
          <div className="avathar">
            <Avatar
              sizes="12px"
              alt="Remy Sharp"
              // src="/static/images/avatar/1.jpg"
            />
          </div>
          </div>
          <div className="cards" >
          <Card />
          </div>
          <motion.div className="cart_new"
          initial={{x:'-100vw'}}
          animate={{x:0}}
          transition={{delay:1,duration:2,type:'spring'}}
          >
          <Cart/>
          </motion.div>
          </motion.div>

    </div>
  )
}

export default View