import React, { useContext } from "react"
import "./Cart.css"
import { StoreContext } from "../../Context/StoreContext"
import { useNavigate } from "react-router-dom"
const Cart = () => {
  const { cartitems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext)
  const navigate = useNavigate()
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartitems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image}></img>
                  <p>{item.name} </p>
                  <p>{item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>{item.price * cartitems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
                <hr></hr>
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>{getTotalCartAmount()}</p>
          </div>
          <hr></hr>
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{getTotalCartAmount() === 0 ? 0 : 40}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>
              {getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 40)}
            </b>
          </div>
          <button onClick={() => navigate("/order")}>
            {" "}
            Proceed to checkout
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code,Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code"></input>
              <button>submit </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
