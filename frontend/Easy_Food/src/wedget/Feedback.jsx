import React from 'react'
import './Feedback.css';


const Feedback = (props) => {
    const yes=()=>{
        props.actions.yes();
    }
    const no=()=>{
        props.actions.no();
    }
  return (
    <div  className='btn42'>
        <button className='button-45' onClick={()=>yes()}>YES</button>
        <button className='button-45' onClick={()=>no()}>NO</button>

    </div>
  )
}

export default Feedback