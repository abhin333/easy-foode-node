import React, { useEffect, useState } from "react";
import "./App.css";
import Item from "./Component/Items/Item";
import View from "./Component/ViewItem/View";
import Home from "./Component/Pages/Home/Home";
import LoginPage from "./Component/Pages/LoginPage/LoginPage";
import SignupPage from "./Component/Pages/SignupPage/SignupPage";
import { Routes, Route, Navigate, json } from "react-router-dom";
import Purchase from "./Component/Pages/PurchasePage/Purchase";
import Cart from "./Component/Pages/cartPage/Cart";
import { useNavigate } from "react-router-dom";
import ViewCart from "./Component/Pages/cartPage/viewCart";
import CartView from "./Component/cart_view/CartView";
import Payment from "./Component/payment/Payment";
import PaymentPage from "./Component/Pages/Payment/PaymentPage";
import PageNot from "./Component/Pages/404/PageNot";
import Success from "./Component/Pages/success/Success";
import Hello from "./Component/Hello"
import AdminPanel from "./Component/Adminpanel/Adminpanel";
import ProtectRoute from "./ProtectRoute";
import baseurl from "./env";
import axios from "axios";
import Cookies from 'js-cookie';



const App = () => {
  const token = localStorage.getItem('access-token') || Cookies.get('access_Token');
  const [state, setState] = useState(false)

  useEffect(() => {
    if (token) {
      setState(true);
      
    }
    else
      setState(false);
  }, [token])


  useEffect(()=>{
   console.log("app run ayiiiiii");
  },[])


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={state ? <Navigate to='/items' /> : <LoginPage />} />
        <Route path="/signup" element={state ? <Navigate to='/items' /> : <SignupPage />} />

        {/* Protected Route */}
        <Route
          path="/items"
          element={<ProtectRoute element={<Purchase />} />}
        />
        <Route path="/view" element={<ProtectRoute element={<Cart />} />} />
        <Route path="/cart" element={<ProtectRoute element={<ViewCart />} />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<PageNot />} />
      </Routes>


    </div>
  );
};

export default App;
