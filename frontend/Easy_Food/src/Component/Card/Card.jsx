import React,{useContext, useEffect, useState} from "react";
import './Card.css'
import StarIcon from '@mui/icons-material/Star';
import { MyContext } from "../Pages/cartPage/Cart";
import { Blurhash } from "react-blurhash";
import { Rating } from "@mui/material";
import baseurl from "../../env";

const Card = () => {
  const context = useContext(MyContext);
  const {product_name,image,price}=context.objectToPass
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    if (image) {
      const images = new Image();
      images.src = image;
      images.onload = () => {
        setLoading(false);
      };
      images.onerror = () => {
        setLoading(false);
      };
    }
  }, [image]);

  return (
    <div>
      <div className="card1">
        <div className="imges">
          {loading ?(
             <div style={{ borderRadius: 30, overflow: 'hidden' }}>

            <Blurhash
                 hash="LLOWTr.9?wDO_4M_M{x].TROI9tl"
                 width={200}
                 height={200}
                 resolutionX={10}
                 resolutionY={10}
                 punch={1}
               />
               </div>
          ):(
          <img className="img-q" src={`${baseurl}Images/${image}`} alt="img" loading="lazy"  />
          )}
        
        </div>
          <span className="name-new">{product_name}</span>
        <div className="starnew"><Rating  value={3} readOnly size="small" /></div>
        <div className="discreption-new">
          This item is spicze and hot chille included.
          This is a chicken burger spicze and hot chille include in the burger

        </div>
        <div className="price-new">
          <span>₹{price}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
