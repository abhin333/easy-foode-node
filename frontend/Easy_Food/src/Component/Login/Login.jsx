import { TextField } from "@mui/material";
import React, { useState } from "react";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import "./Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginBar from "./Loginbar/LoginBar";
import Button from "../Button/Button";
import SocialMedia from "../SocialMedias/SocialMedia";
import { emailRegex } from "../regex/Regex";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import burggerimg from "../../assets/image/burggerpices.png"
import tomatto from "../../assets/image/tomatto.png"
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
 
  const [show,setShow]=useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
    setError({ ...error, [name]: false });
  };

  const unView=()=>{
    setShow(false)
  }
  const view=()=>{
    setShow(true)
  }

  const handleSubmit = async(e) => {
    if(loginData.email ==='' ||loginData.password ===''){
      toast.error("Please Enter Email or Password")
      return
    }
    e.preventDefault();
    try{
      const res= await axios.post("http://localhost:3005/login",{data:loginData})
        if(res.status==200){
          toast.success("successfuly login")
          setTimeout(()=>{
            navigate('/items')
          },1000)
          localStorage.setItem('isLoggedIn', res.data.accessToken);
        }
    }catch(error){
      toast.error(error.response.data.error)
    }
     
  };
  return (
    <div>
      <motion.div className="main"
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:10,type:'spring'}}
      >
        <div className="burggerimg">
          <img src={burggerimg} alt="" />
        </div>
        <motion.div className="loginbox"
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1,duration:2,type:"tween"}}
        >
          <LoginBar />
          <div className="input-filed">
            <form>
              <div className="email">
                <TextField
                  id="standard-basic"
                  label="Email"
                  name="email"
                  type={"email"}
                  onChange={handleChange}
                  value={loginData.email}
                  variant="standard"
                  required={true}
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#EBD1D1", // Change 'red' to the color you want
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                      fontFamily: "inherit",
                    },
                  }}
                />
                <MarkEmailUnreadIcon sx={{ fontSize: 14 }} />
              </div>
              <div className="password">
                <TextField
                  id="standard-basic"
                  label="Password"
                  onChange={handleChange}
                  name="password"
                  type={show?"text":"Password"}
                  value={loginData.password}
                  variant="standard"
                  required={true}
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#EBD1D1",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                      fontFamily: "inherit",
                    },
                  }}
                />
                {
                  show?
                 <div onClick={unView}>
                   <VisibilityIcon sx={{ fontSize: 14 }} />
                 </div>
                 :
                 <div onClick={view}>
                   <VisibilityOffIcon sx={{ fontSize: 14 }} />
                 </div>
                
                }
              </div>
              <span className="forgot">
                Forgot Password.?
              </span>
              <div className="loginbutton" onClick={handleSubmit} >
                <Button Login="Login" />
                <Toaster />
              </div>
              <h4>or</h4>
              <div className="social">
                <SocialMedia />
              </div>
            </form>
          </div>
        </motion.div>
        <div className="right-cornner">
          <img src={tomatto} alt="tomatto" />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
