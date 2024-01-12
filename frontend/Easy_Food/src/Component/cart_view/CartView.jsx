import React, { useEffect, useLayoutEffect, useState } from "react";
import "./CartView.css";
import { motion } from "framer-motion";
import ShortTextIcon from "@mui/icons-material/ShortText";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartView = (props) => {
  const {id,product_name}=props;
const navigate=useNavigate()
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const storedItems = localStorage.getItem("cartItems");
  const dataList = JSON.parse(storedItems);
  const initialCounts = dataList.map((event) =>event.count?event.count:1 );
  const [count, setCount] = useState(initialCounts);
  const intialPrice=dataList.map((event)=>event.Cart.item.price)
  const[price,setPrice]=useState(intialPrice)
  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    const dataList2 = JSON.parse(storedItems);
    calculation(dataList2)
  },[data,count]);
  useEffect(()=>{
    setData(dataList);
    
  },[])
 
const increment =(index,event)=>{
  const newCount = [...count];
  newCount[index] += 1;
  setCount(newCount);
}
const decrement=(index)=>{
  const newCount = [...count];
  newCount[index] -= 1;
  setCount(newCount);
  
  
}
const updatedData = data.map((item, i) => ({
  ...item,
  count: count[i],
}));
localStorage.setItem("cartItems", JSON.stringify(updatedData));

const buyNow=(data,price)=>{
  navigate('/payment',{state:{data,price}})
}

const calculation=(dataList2)=>{
  const numbers=data.map((e)=>{
    return e.Cart.item.price
  })
  
  const newResult = numbers.map((value, index) => value * count[index]);
  const sum = newResult.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  setResult(newResult)
  setPrice(sum)
  
}

  const logOut = () => {
    
    }
  const back =()=>{
    navigate('/items')
  }  

  return (
    <div>
      <motion.div
        className="main44" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 2, type: "tween" }}
        // key={index}
      >
        <div className="header3">
          <div className="icons3" onClick={back}>
            <ShortTextIcon />
          </div>
          <div className="avathar" onClick={logOut}>
            <Avatar
              sizes="12px"
              sx={{ fontSize: "12px" }}
              alt="Remy Sharp"
              // src="/static/images/avatar/1.jpg"
            ></Avatar>
          </div>
        </div>
          <div className="submitbutton">
            <span className="price7">{price}</span>
          <div className="buynow3" onClick={()=>buyNow(data,price)}>BuyNow</div>
          </div>
              <div className="box3">
        {data.map((event, index) => {
        console.log("@@@@@@@@@",event);
          return (
            <>
                <div className="item_view3">
                  <p className="name3" >{event.Cart.item.name}</p>
                  <div className="images3">
                    <img className="image3" src={`http://localhost:3005/Images/${event.Cart.item.url}`} alt="img" />
                  </div>
                  
                  <div className="count_icon3">
                    <div className="plus3" onClick={(e) =>increment(index,event)}>
                      +
                    </div>
                    <span className="count3">{count[index]}</span>
                    <div
                      className="minnus3"
                      onClick={(e) =>decrement(index)}
                      >
                      -
                    </div>
                    {/* <div className="buynow3" onClick={(e)=>buyNow(e,index,event)}>BuyNow</div> */}
                  </div>
                  <span className="price8">price:{event.Cart.item.price*count[index]}</span>
                </div>
                <hr />
            </>
          );
        })}
        </div>
      </motion.div>
    </div>
  );
};

export default CartView;
