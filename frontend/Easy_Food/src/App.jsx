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
import  ViewCart from "./Component/Pages/cartPage/viewCart";
import CartView from "./Component/cart_view/CartView";
import Payment from "./Component/payment/Payment";
import PaymentPage from "./Component/Pages/Payment/PaymentPage";
import PageNot from "./Component/Pages/404/PageNot";
import Success from "./Component/Pages/success/Success";
import Hello from "./Component/Hello"
import AdminPanel from "./Component/Adminpanel/Adminpanel";

const App = () => {
  
  const navigate = useNavigate();
  const [users, setUsers] = useState(false);
  const token=localStorage.getItem('access-token')

  useEffect(()=>{
    if(token){
      setUsers(true);
    }else{
      setUsers(false);
    }
  },[token])
  console.log('ssss',token);
  console.log("www",users);
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/items" element={users ? <Purchase />:<Navigate to='/login'/> } />
        <Route path="/view" element={<Cart />} />
        <Route path="/cart" element={<ViewCart/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path="/success" element={ <Success/>}/>
        <Route path="/hello" element ={<Hello/>}/>
        <Route path ='/admin' element={<AdminPanel/>}/>
        <Route path="*" element={<PageNot/>}/>

      </Routes>
     
       
    </div>
  );
};

export default App;
