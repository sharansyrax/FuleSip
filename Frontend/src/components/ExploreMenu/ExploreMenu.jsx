import React from "react"
import "./ExploreMenu.css"
import { menu_list } from "../../assets/frontend_assets/assets.js"

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Fuel your body with clean, high-quality ingredients. From fresh salads
        and grilled proteins to energizing shakes and vegan options — our menu
        is designed to power your lifestyle, no matter your fitness goals.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => {
                setCategory((prev) =>
                  prev == item.menu_name ? "All" : item.menu_name
                )
              }}
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
              ></img>
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr></hr>
    </div>
  )
}

export default ExploreMenu
