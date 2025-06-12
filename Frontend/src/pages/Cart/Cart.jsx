import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartitems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
    discountAmount,
    setDiscountAmount,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 40;
  const totalBeforeDiscount = subtotal + deliveryFee;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  const handlePromoSubmit = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10" && !discountApplied) {
      const discount = totalBeforeDiscount * 0.1;
      setDiscountAmount(discount);
      setDiscountApplied(true);
    }
  };

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
        {food_list.map((item) => {
          if (cartitems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartitems[item._id]}</p>
                  <p>₹{item.price * cartitems[item._id]}</p>
                  <p
                    className="cross"
                    onClick={() => removeFromCart(item._id)}
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>SubTotal</p>
            <p>₹{subtotal}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee}</p>
          </div>
          <hr />
          {discountApplied && (
            <>
              <div className="cart-total-details">
                <p>Promo Applied (SAVE10)</p>
                <p>-₹{discountAmount.toFixed(2)}</p>
              </div>
              <hr />
            </>
          )}
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{totalAfterDiscount.toFixed(2)}</b>
          </div>
          <button onClick={() => navigate("/order")}>Proceed to checkout</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="Try SAVE10 for 10% off"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoSubmit}>Submit</button>
            </div>
            {discountApplied && (
              <p className="promo-success">✅ Promo code applied successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
