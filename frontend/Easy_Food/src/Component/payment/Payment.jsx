import React, { useEffect, useState } from "react";
import ShortTextIcon from "@mui/icons-material/ShortText";
import { Avatar, Radio, TextareaAutosize, TextField } from "@mui/material";
import "./Payment.css";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import baseurl from "../../env";

const Payment = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const objectToPass = location.state.data;
  const price = location.state.price;



  const [data, setData] = useState({
    email: "",
    address: "",
    mobile: "",
    paymentMethod: "Cash On Delivery",
    items: objectToPass,
    order_id: ''
  });
  useEffect(() => {
    generateRandomCode()
  }, [data.length > 0])

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      console.log("fff", randomIndex);
      code += characters.charAt(randomIndex);
    }
    console.log("ccc", code);
    const updatedData = {
      ...data,
      order_id: code
    };

    setData(updatedData);
  }

  console.log("EEEEEE", data);

  const dataHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const clickHandler = async (data) => {
    try {
      const response = await axios.post(`${baseurl}api/v1/order`, data)
      if (response.status ==200) {
        if(response?.data?.PaymentMethod ==="Gpay"){
          displayRazorpay();
        }else
        {
        localStorage.removeItem("cartItems");
        navigate('/success');
        }
    }

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  const logOut = () => {
    localStorage.clear();

  };
  const back = () => {
    navigate("/items");
  };


  const displayRazorpay = async () => {

    const options = {
      key: "rzp_test_t5X4q81qTu1P6e", // Enter the Key ID generated from the Dashboard
      key_secret: "kgI42J6PsK9qH6v1KZeFWvba",
      amount: price * 100,
      currency: "INR",
      name: "Fast FOOD.",
      description: "Test Transaction",
      // order_id: data.order_id,
      image:
        "https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/nakelakvvkgahedukgxv",
      handler: async function (response) {
        navigate("/success");
        localStorage.removeItem("cartItems")
      },
      prefill: {
        name: "abhin",
        email: "abhinpradeepan123@gmail.com",
        contact: "7902314666",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

  }



  return (
    <div>
      <form>
        <motion.div
          className="main5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="header5">
            <div className="icons5" onClick={back}>
              <ShortTextIcon />
            </div>
            <div className="avathar5" onClick={logOut}>
              <Avatar
                sizes="12px"
                alt="Remy Sharp"
              // src="/static/images/avatar/1.jpg"
              />
            </div>
          </div>
          <div className="box">
            <div className="inputfiled">
              <TextField
                id="standard-basic"
                type={"email"}
                label="Email:"
                name="email"
                value={data.email}
                onChange={dataHandler}
                variant="standard"
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#EBD1D1", // Change 'red' to the color you want
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "black",
                  },
                }}
              />
              <TextField
                id="standard-basic"
                type={"text"}
                label="Address:"
                name="address"
                value={data.address}
                onChange={dataHandler}
                variant="standard"
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#EBD1D1", // Change 'red' to the color you want
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "black",
                  },
                }}
              />
              <TextField
                id="standard-basic"
                type={"number"}
                label="MobileNo:"
                name="mobile"
                onChange={dataHandler}
                value={data.mobile}
                variant="standard"
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#EBD1D1", // Change 'red' to the color you want
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "12px",
                    fontFamily: "inherit",
                    color: "black",
                  },
                }}
              />
              <div className="payment">
                <span className="pay">Choose Payment System</span>

                <div className="radio-btn">
                  <label>
                    COD
                    <Radio
                      checked={data.paymentMethod === "Cash On Delivery"}
                      onChange={dataHandler}
                      name="paymentMethod"
                      value="Cash On Delivery"
                      inputProps={{ "aria-label": "Cash On Delivery" }}
                    />
                  </label>
                  <label>
                    ONLINE
                    <Radio
                      checked={data.paymentMethod === "Gpay"}
                      onChange={dataHandler}
                      name="paymentMethod"
                      value="Gpay"
                      inputProps={{ "aria-label": "Gpay" }}
                    />
                  </label>
                </div>
              </div>
              <div className="button" onClick={() => clickHandler(data)}>
                <span className="btn5">CONTINUE</span>
                <Toaster />
              </div>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default Payment;
