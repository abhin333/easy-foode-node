import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import "./Categeory.css";

const Categeory = (props) => {
  const { url, name, price } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (url) {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        setLoading(false);
      };
      image.onerror = () => {
        setLoading(true);
      };
    }
  }, [url]);
  return (
    <div>
      <div className="categeory2">
        <div className="image ">

          {loading ? (
             <div style={{ borderRadius: 50, overflow: 'hidden' }}>
               <Blurhash
                 hash="LLOWTr.9?wDO_4M_M{x].TROI9tl"
                 width={100}
                 height={90}
                 resolutionX={10}
                 resolutionY={10}
                 punch={1}
               />
           </div>
          ) : (
            <img className="imgsss" src={url} alt="burger2" loading="lazy"/>
          )}
        </div>
        <div className="name">
          <span>{name}</span>
          <span className="star"><Rating  value={3} readOnly size="small" /></span>
        </div>
        <div className="price">
          <p className="price-mark">₹{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Categeory;
