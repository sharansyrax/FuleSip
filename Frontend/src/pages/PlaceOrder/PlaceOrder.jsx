import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    food_list,
    cartitems,
    url,
    discountAmount, // ✅ Get from StoreContext
  } = useContext(StoreContext);

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
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const PlaceOrder = async (event) => {
    event.preventDefault();
    console.log("Entered placeOrder function");

    let order_items = [];
    food_list.forEach((item) => {
      if (cartitems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartitems[item._id] };
        order_items.push(itemInfo);
      }
    });

    const deliveryFee = getTotalCartAmount() === 0 ? 0 : 40;
    const finalAmount =
      getTotalCartAmount() + deliveryFee - discountAmount;

    let orderData = {
      address: data,
      items: order_items,
      amount: finalAmount,
    };

    console.log("Order Data:", orderData);

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        {
          headers: { token },
        }
      );

      console.log("Order Response:", response.data);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.error("❌ Order not successful:", response.data.message);
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error while placing order:", error);

      if (error.response) {
        alert(
          `Order failed: ${
            error.response.data.message || "Something went wrong"
          }`
        );
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("Unexpected error occurred. Check console for details.");
      }
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={PlaceOrder} className="place-order">
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
            placeholder="Second Name"
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
          placeholder="Phone no"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
          </div>
          <hr />
          {discountAmount > 0 && (
            <>
              <div className="cart-total-details">
                <p>Promo Applied</p>
                <p>-₹{discountAmount.toFixed(2)}</p>
              </div>
              <hr />
            </>
          )}
          <div className="cart-total-details">
            <b>Total</b>
            <b>
              ₹
              {getTotalCartAmount() +
                (getTotalCartAmount() === 0 ? 0 : 40) -
                discountAmount}
            </b>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
