import React,{createContext} from 'react'
import { useLocation } from 'react-router-dom';
import View from '../../ViewItem/View'


export const MyContext = createContext();
const Cart = ({children}) => {

  const location = useLocation();
  const  objectToPass  = location.state.event
  return (
    <div>
      <MyContext.Provider value={{objectToPass}}>
        <View/> 
      </MyContext.Provider>
    </div>
  )
}

export default Cart