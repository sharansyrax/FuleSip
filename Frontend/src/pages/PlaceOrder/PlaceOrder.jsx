import React, { useContext, useState, useEffect } from "react"
import { StoreContext } from "../../Context/StoreContext"
import "./PlaceOrder.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartitems,
    url,
    discountAmount, // ✅ use from context
  } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart")
    }
  }, [token])

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 40
  const finalAmount = getTotalCartAmount() + deliveryFee - discountAmount

  const PlaceOrderHandler = async (event) => {
    event.preventDefault()

    const order_items = food_list
      .filter((item) => cartitems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartitems[item._id],
      }))

    const orderData = {
      address: data,
      items: order_items,
      amount: finalAmount,
    }

    try {
      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      })

      if (response.data.success) {
        window.location.replace(response.data.session_url)
      } else {
        alert("Failed to place order. Please try again.")
      }
    } catch (error) {
      console.error("❌ Error placing order:", error)
      alert("Something went wrong. Try again later.")
    }
  }

  return (
    <form onSubmit={PlaceOrderHandler} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr />
          {discountAmount > 0 && (
            <>
              <div className="cart-total-details">
                <p>Promo Discount</p>
                <p>-₹{discountAmount.toFixed(2)}</p>
              </div>
              <hr />
            </>
          )}
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{finalAmount.toFixed(2)}</b>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
