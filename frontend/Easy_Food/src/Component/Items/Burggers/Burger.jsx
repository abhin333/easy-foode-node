import { border } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./Burgers.css";

const Burger = (props) => {
  const {data,onMouseEnter,onMouseLeave,index2,onClick } = props;
 
  return (
    <div className="display">
      {data.map((event,index)=>{
        return(
          <div
          key={event.id}
          className="items"
          onMouseEnter={(e) => onMouseEnter(index,event.name)}
          onMouseLeave={onMouseLeave}

          style={{
            border: index2 === index? "1px solid red" : "" ,
          }}
        >
          <div className="img">
            <img src={event.url} alt="burgger" />
          </div>
          <span className="item-name">{event.name}</span>
        </div>
        )
      })}
     
    </div>
  );
};

export default Burger;
