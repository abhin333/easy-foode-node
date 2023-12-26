import React from 'react'
import { useNavigate } from 'react-router-dom'
import pagenotfound from "../../../assets/image/404.png"

const PageNot = () => {
  const navigate=useNavigate()
  const home=()=>{
    navigate('/')
  }
  return (
    <div>
        <div className="404img" style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:"100vh"}} onClick={home}>
        <img src={pagenotfound} alt=""  style={{width:'100%'}}/>
        </div>
    </div>
  )
}

export default PageNot