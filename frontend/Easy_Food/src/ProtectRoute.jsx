import React from 'react'
import { useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const ProtectRoute = ({element}) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access-token')|| Cookies.get('access_Token');
    console.log("tokenenene",token);
  
    useEffect(() => {
      if ( !token  ) {
        navigate('/login'); // Redirect to login if not authenticated
      }
    }, [ token, navigate]);
  
    return token ? element : null;
  };

export default ProtectRoute