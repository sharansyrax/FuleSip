import React, { useState, useEffect } from "react"
import "./Orders.css"
import axios from "axios"
import { toast } from "react-toastify"
import { assets } from "../../assets/assets"

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list")

      if (response.data.success) {
        setOrders(response.data.data)
        console.log(response.data.data)
      } else {
        toast.error("Failed to fetch orders")
      }
    } catch (error) {
      console.error("Fetch error:", error)
      toast.error("Server error: " + error.message)
    }
  }

  useEffect(() => {
    console.log("URL passed to Orders:", url)
    fetchAllOrders()
  }, [])
const handleStatusChange = async (orderId, newStatus) => {
  try {
    const response = await axios.post(url + "/api/order/status", {
      orderId: orderId,
      status: newStatus,
    });

    if (response.data.success) {
      toast.success("Order status updated");
      fetchAllOrders(); // Refresh the list
    } else {
      toast.error("Failed to update status");
    }
  } catch (error) {
    console.error("Status update error:", error);
    toast.error("Server error: " + error.message);
  }
};

  return (
    <div className="order  add">
      <h2>All Orders</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon}></img>
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index == order.items.length - 1) {
                      return item.name + "X" + item.quantity
                    } else {
                      return item.name + "X" + item.quantity + ","
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone"> {order.address.phone}</p>
              </div>
              <p>Items :{order.items.length}</p>
              <p>OrderAmount :₹{order.amount}</p>
              <select  value={order.status}
  onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for deivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
