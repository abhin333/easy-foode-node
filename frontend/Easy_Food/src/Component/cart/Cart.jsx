import React, { useContext, useState } from "react";
import "./Cart.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../Pages/cartPage/Cart";
import { useEffect } from "react";
const Cart = () => {
  const context = useContext(MyContext);
  const [item, setItem] = useState([]);
  const { name, url, price, id } = context.objectToPass;
  const navigate = useNavigate();
  useEffect(() => {
    if (item.length > 0) {
      updatefirestore(item);
    }
  }, [item]);
  if (item.length == 0) {
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setItem(JSON.parse(storedItems));
    }
  }
  const pageChange = (item) => {
    item.length > 0
      ? localStorage.setItem("cartItems", JSON.stringify(item))
      : "";
    navigate("/cart", { state: { name, url, price, id } });
  };

  const clickHandler = () => {
    const newItem = {
      Cart: {
        item: {
          name: name,
          price: price,
          url: url,
          id: id,
        },
      },
    };

    const existingItem = item.find((e) => e.Cart.item.id === id);

    if (!existingItem) {
      // If the item doesn't exist, add it
      alert("Item added");
      setItem((prev) => [...prev, newItem]);
    } else {
      // If the item exists, increment the count
      alert("Item already exists");
      item.forEach((val) => {
        val.count++;
      }); // Increment the count property of the existing item
      pageChange(item);
    }
  };
  pageChange(item);

  const updatefirestore = (item) => {
    
  };
  return (
    <div>
      <div className="cart" onClick={clickHandler}>
        <ShoppingCartIcon />
      </div>
    </div>
  );
};

export default Cart;
