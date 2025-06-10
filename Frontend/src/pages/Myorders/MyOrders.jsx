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

  const trackOrder = async (orderId) => {
    try {
      const response = await axios.post(
        url + "/api/order/status",
        { orderId, status: "Out for delivery" },
        { headers: { token } }
      )

      if (response.data.success) {
        console.log("Order status updated:", response.data)
        await fetchOrders()
      } else {
        console.error("Status update failed")
      }
    } catch (err) {
      console.error("Error updating order status:", err)
    }
  }

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
