import React, { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import { StoreContext } from "../../Context/StoreContext"
import axios from "axios"
import { assets } from "../../assets/frontend_assets/assets.js"

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [data, setData] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        {
          headers: { token },
        }
      )
      setData(response.data.data)
      console.log("Orders fetched:", response.data)
    } catch (err) {
      console.error("Error fetching orders:", err)
    }
  }

 const trackOrder = async () => {
  try {
    await fetchOrders(); // Just re-fetch updated order list
    toast.info("Order status refreshed");
  } catch (err) {
    console.error("Error refreshing order status:", err);
    toast.error("Failed to refresh status");
  }
};


  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order) => (
          <div key={order._id} className="my-orders-order">
            <img src={assets.parcel_icon} alt="parcel icon" />

            <p>
              {order.items
                .map((item) => `${item.name} x ${item.quantity}`)
                .join(", ")}
            </p>
            <p>₹{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>

            <button onClick={() => trackOrder(order._id)}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
