import React, { useState } from "react";
// import Login from '../Login/Login'
import "./Signup.css";
import { TextField, duration } from "@mui/material";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoginBar from "../Login/Loginbar/LoginBar";
import Button from "../Button/Button";
import SocialMedia from "../SocialMedias/SocialMedia";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast, { Toaster } from 'react-hot-toast';
import burgger from "../../assets/image/burggerpices.png"
import tomatto from "../../assets/image/tomatto.png"
import axios from "axios";
import baseurl from "../../env";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    mobile_no: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [show, setShow] = useState(false);
  const [shows,setShows]=useState(false)


  //password
const passwordShows=()=>{
  setShow(true)
}
const passwordUnShows=()=>{
  setShow(false)
}
// confirm passworde
  const passwordView = () => {
    setShows(true);
  };
  const passwordUnview = () => {
    setShows(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("dsavgtuyrd",name,value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.mobile_no===''||formData.username===''||formData.confirm_password===''){
      toast.error("Please Enter The Data",{duration:1500});
      return 
    }
    if (formData.password !== formData.confirm_password) {
      toast.error("Password and Confirm Password do not match.",{duration:1500});
      return;
    }
    try{ 
      await axios.post(`${baseurl}signup`,{data:formData}).then((res)=>{
        console.log("ressspp",res);
        if(res.status==200){
          toast.success("successfully registred")
          navigate('/login')

        }
        else{
          toast.error("registration faield")
        }
      })
      

    }catch(error){
        toast.error(error.response.data.error,{duration:1000})
    }
   
  };


 
  return (
    <div>
      <motion.div
        className="main"
        initial={{ y: "-100" }}
        animate={{ y: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="burggerimg">
          <img src={burgger} alt="burgger" />
        </div>
        <motion.div
          className="loginbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <LoginBar />
          <div className="input-filed">
            <form>
              <div className="password">
                <TextField
                  id="standard-basic"
                  label="Name"
                  name="username"
                  variant="standard"
                  value={formData.username}
                  onChange={handleChange}
                  required
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
              </div>
              <div className="mobile-number">
                <TextField
                  id="standard-basic"
                  label="Mobile_no"
                  name="mobile_no"
                  type={"number"}
                  variant="standard"
                  onChange={handleChange}
                  value={formData.mobile_no}
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
              </div>
              <div className="email">
                <TextField
                  id="standard-basic"
                  label="Email"
                  name="email"
                  type={"email"}
                  onChange={handleChange}
                  variant="standard"
                  value={formData.email}
                  required
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
                  label="password"
                  name="password"
                  type={show ? "text" : "password"}
                  onChange={handleChange}
                  value={formData.password}
                  required
                  variant="standard"
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
                {show?
                <div onClick={passwordUnShows}>
                <VisibilityIcon sx={{ fontSize: 14 }} />
                </div>:
                <div onClick={passwordShows}>
                    <VisibilityOffIcon sx={{ fontSize: 14 }} />
                  </div>}
              </div>
              <div className="password">
                <TextField
                  id="standard-basic"
                  label="confirm password"
                  type={shows ? "text" : "password"}
                  name="confirm_password"
                  variant="standard"
                  onChange={handleChange}
                  value={formData.confirm_password}
                  required
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
                {shows ? (
                  <div onClick={passwordUnview}>
                     <VisibilityIcon sx={{ fontSize: 14 }} />
                  </div>
                ) : (
                  <div onClick={passwordView}>
                    <VisibilityOffIcon sx={{ fontSize: 14 }} />
                  </div>
                )}
              </div>
              <div className="loginbutton" onClick={handleSubmit} >
                <Button Login="Signup" />
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

export default Signup;
