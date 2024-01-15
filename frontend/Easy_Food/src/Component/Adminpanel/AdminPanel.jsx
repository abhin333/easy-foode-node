import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import { FaDownload } from "react-icons/fa6";
import { useReactToPrint } from 'react-to-print';

const AdminPanel = () => {
  const componentRef = useRef(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3005/admin/api/v1');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const download = () => {
    console.log("sss");
    useReactToPrint({
      content: () => componentRef.current,
    })
  }

  return (
    <div className="admin-panel-container">
      <div className='btn-left'  onClick={download}>
        <FaDownload />
      </div>

      <h1 className="admin-panel-title">Admin Panel - Orders</h1>
      <div ref={componentRef }style={{width:'100%'}}>
      <table className="order-table">
        <thead>
          <tr>
            <th className="order-id">SN</th>
            <th className="order-id">Order ID</th>
            <th className="customer-email">Customer Email</th>
            <th className="customer-address">Customer Address</th>
            <th className="order-payment">Payment Method</th>
            <th className="order-items">Order Item Name</th>
            <th className="order-prices">Price</th>
            <th className="customer-count">Count</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            console.log("Order:", order);  // Log the entire order object

            // Arrays to accumulate values for each order
            let names = [];
            let prices = [];
            let counts = [];

            return (
              <tr key={order._id}>
                <td className="order-sn">{index + 1}</td>
                <td className="order-id">{order._id}</td>
                <td className="customer-email">{order.Email}</td>
                <td className="customer-address">{order.Address}</td>
                <td className="order-payment">{order.PaymentMethod}</td>
                {/* Assuming order has an array named 'orderItems' */}
                {order?.order.map((item, index) => {
                  console.log("Order Item:", item);  // Log each order item

                  // Accumulate values in arrays
                  names.push(item?.Cart?.item?.name);
                  prices.push(item?.Cart?.item?.price);
                  counts.push(item?.count);
                })}
                <td className="order-names">{names.join(", ")}</td>
                <td className="order-prices">{prices.join(", ")}</td>
                <td className="customer-counts">{counts.join(", ")}</td>
              </tr>
            );
          })}



        </tbody>
      </table>
      </div> 

    </div>
  );
};

export default AdminPanel;
