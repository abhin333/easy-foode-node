import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Blurhash } from "react-blurhash";
import "./Categeory.css";
import baseurl from "../../../env";

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
        setLoading(false);
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
            <img className="imgsss" src={`${baseurl}Images/${url}`} alt={name} loading="lazy"/>
          )}
        </div>
        <div className="name">
          <span>{name}</span>
          <span className="star"><Rating value={3} readOnly size="small" /></span>
        </div>
        <div className="price">
          <p className="price-mark">₹{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Categeory;
