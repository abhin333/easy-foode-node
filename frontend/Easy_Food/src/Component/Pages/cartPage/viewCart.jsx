import React from 'react'
import CartView from '../../cart_view/CartView'
import { useLocation } from 'react-router-dom';

const viewCart = () => {
  const location = useLocation();
  const receivedData = location.state;

  return (
    <div>
        <CartView data={receivedData}/>
    </div>
  )
}

export default viewCart