import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./LoginBar.css"

const LoginBar = () => {
  const navigate=useNavigate()
  const login =()=>{
    navigate('/login')
  }
  const signup =()=>{
    navigate('/signup')
  }
  return (
    <div>
         <div className="login_btn-parent">
            <div className="login-child" onClick={login}>
              <span>Login</span>
            </div>
            <div className="siginup-child" onClick={signup}>
              <span className="signup">signup</span>
            </div>
          </div>
    </div>
  )
}

export default LoginBar