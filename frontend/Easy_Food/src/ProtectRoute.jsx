import React from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectRoute = ({ element }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const token =localStorage.getItem("access-token") ||localStorage.getItem("access_Token");
  console.log("tokenenene", token);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    console.log("token kitttiii", token);
    if (token) {
      localStorage.setItem("access_Token", token);
      // Optionally, remove the token from the URL
      window.history.replaceState({}, document.title, "/items");
      window.location.reload()
    }
  }, [location]);

  // Rest of your component
  useEffect(() => {
    const token =
      localStorage.getItem("access-token") ||
      localStorage.getItem("access_Token");
    console.log("pppppppp", token);
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [token, navigate]);

  return token ? element : null;
};

export default ProtectRoute;
