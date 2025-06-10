import React, { useContext } from "react"
import "./FoodItem.css"
import { assets } from "../../assets/frontend_assets/assets"
import { StoreContext } from "../../Context/StoreContext"

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartitems, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          className="food-item-image"
          alt={name}
        />

        {!cartitems?.[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            alt="add"
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt="remove"
              onClick={() => removeFromCart(id)}
            />
            <p>{cartitems?.[id]}</p>
            <img
              src={assets.add_icon_green}
              alt="add more"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_stars} alt="rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
