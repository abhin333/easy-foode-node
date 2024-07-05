import React, { useState, useLayoutEffect, useEffect } from "react";
import { Avatar, Pagination } from "@mui/material";
import ShortTextIcon from "@mui/icons-material/ShortText";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Item.css";
import Burger from "./Burggers/Burger";
import Categeory from "./Categeory/Categeory";
import Cart from "../cart/Cart";
import { logo_api } from "../../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../../config";
import MessageParser from "../../MessageParser";
import ActionProvider from "../../ActionProvider";
import axios from "axios";
import baseurl from "../../env";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';


const Item = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [logo, setLogo] = useState(logo_api);
  const [image, setImage] = useState([]);
  const [chickenLogo, setChickenLogo] = useState([]);
  const [pizzaLogo, setPizzaLogo] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("Burger");
  const [loder, setLoder] = useState(false);
  const [index2, setIndex2] = useState(0);
  const token = localStorage.getItem('access-token') || Cookies.get('access_Token');
    

  useEffect(() => {
    dataFetch();
  }, [name]);

  useEffect(() => {
    filtreData();
  }, [data]);

  const logOut = () => {
    var userResponse = confirm("Do you want to Logout ?");
    if (userResponse) {
      localStorage.clear();
      Cookies.remove('access-token');
      axios.get(`${baseurl}logout`).then((res) => {
        if(res.status==200){
          Cookies.remove('access_Token') ;
          window.location.reload();
        }
        else{
          alert("something went wrong")
        }

      })

    }
  };

  const viewCart = () => {
    navigate("/view");
  };

  const clickHandler = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  console.log("imageeeee", image);

  const dataFetch = async () => {
    try {
      const response = await axios.get(`${baseurl}api/v1/view`, {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data);
      setLoder(true);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const filtreData = () => {
    const filteredData = data.filter((item) => item.product_name === "Burger");
    setImage(filteredData);
    const filterChicken = data.filter(
      (item) => item.product_name === "Chicken"
    );
    setChickenLogo(filterChicken);
    const filterPizza = data.filter((item) => item.product_name === "Pizza");
    setPizzaLogo(filterPizza);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const categeoryHandle = (name) => { };
  const clcikHandler = (event, index) => {
    navigate("/view", { state: { event } });
  };
  const mouseEnter = (index, name) => {
    setName(name);
    setIndex2(index);
  };

  const mouseLeave = () => {
    setIndex2(-1);
  };

  return (
    <div>
      <motion.div
        className="main2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 2, type: "tween" }}
      >
        <div className="header2">
          <div className="icons2">
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
        <p>Choose the Food you love</p>
        <div className="search-input">
          <Row>
            <Col sm={5}>
              <Form className="d-flex ">
                <Form.Control
                  type="search"
                  placeholder="search for the Food Items"
                  className="custom-input me-2 rounded-pill"
                  aria-label="Search"
                  style={{ width: "320px" }}
                />
              </Form>
            </Col>
          </Row>
        </div>
        <p className="categeory">Categeory...</p>
        <motion.div
          className="list-items"
          initial={{ x: "-100" }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1, duration: 2 }}
        >
          <div className="berger">
            <Burger
              data={logo_api}
              index2={index2}
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            />
          </div>
        </motion.div>
        <span className="burgger-dis">{name}</span>
        <motion.div
          className="categeory-list"
          initial={{ y: "150" }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1, duration: 2 }}
        >
          <SkeletonTheme baseColor="#d3c8c8" highlightColor="#444">
            {name === "Burger"
              ? image.map((event, index) => {
                const url = event.image;
                const name = event.product_name;
                const price = event.price;
                return (
                  <>
                    <div
                      key={event.id}
                      onClick={() => clcikHandler(event, index)}
                    >
                      <Categeory url={url} name={name} price={price} />
                    </div>
                  </>
                );
              })
              : ""}
            {image?.length <= 0 || chickenLogo?.length <= 0 || pizzaLogo?.length <= 0 ? <>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 12,
                  display: 'block',
                  lineHeight: 2,
                  padding: "1rem",
                  marginTop: "0.5rem",
                  width: 120,
                  height: 170,
                }}
              >
                <Skeleton count={4} />
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  display: 'block',
                  borderRadius: 12,
                  lineHeight: 2,
                  padding: "1rem",
                  marginTop: "0.5rem",
                  width: 120,
                  height: 170,
                }}
              >
                <Skeleton count={4} />
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  display: 'block',
                  borderRadius: 12,
                  lineHeight: 2,
                  padding: "1rem",
                  marginTop: "0.5rem",
                  width: 120,
                  height: 170,
                }}
              >
                <Skeleton count={4} />
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  display: 'block',
                  borderRadius: 12,
                  lineHeight: 2,
                  padding: "1rem",
                  marginTop: "0.5rem",
                  width: 120,
                  height: 170,
                }}
              >
                <Skeleton count={4} />
              </div>

            </> : ('')}

            {name === "Chicken"
              ? chickenLogo.map((event, index) => {
                const url = event.image;
                const name = event.product_name;
                const price = event.price;

                return (
                  <div key={index} onClick={() => clcikHandler(event, index)}>
                    <Categeory url={url} name={name} price={price} />
                  </div>
                );
              })
              : ""}



            {name === "Pizza"
              ? pizzaLogo.map((event, index) => {
                const url = event.image;
                const name = event.product_name;
                const price = event.price;
                return (
                  <div
                    key={event.id}
                    onClick={() => clcikHandler(event, index)}
                  >
                    <Categeory url={url} name={name} price={price} />
                  </div>
                );
              })
              : ""}

          </SkeletonTheme>

        </motion.div>
        <div className="clik" onClick={clickHandler}>
          <img
            src="https://img.freepik.com/premium-vector/artificial-intelligence-ai-robot-chat-bot-logo-vector-template_8169-533.jpg"
            alt=""
            className="bot-img"
          />
        </div>
        {isOpen ? (
          <div style={{ display: "flex", float: "right", position: "fixed" }}>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              headerText="Chatbot"
            />
          </div>
        ) : (
          ""
        )}

        <div className="ecllips">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
        {/* <motion.div className="cart-pic"
         initial={{x:'-100vw'}}
         animate={{x:0}}
         transition={{delay:1,duration:2,type:'spring'}}
        >
          <Cart />
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default Item;
