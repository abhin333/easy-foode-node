import React  from 'react'
import "./OverView.css"



const OverView = (props) => {
  const intialAction=()=>{
    props.actions.IntialAction();
  }
  const intialPayment=()=>{
    props.actions.intialPayment();
  }
  const feedBack =()=>{
    props.actions.feedBack();
  }

  return (
    <div className='btn45'>
      <button className='button-45' onClick={()=>intialAction()} >Let's go</button>
      <button className='button-45' onClick={()=>intialPayment()} >payment</button>
      <button className='button-45' onClick={()=>feedBack()} >Feedback</button>
    </div>
    )
}
export default OverView