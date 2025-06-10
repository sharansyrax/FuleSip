import React from "react"
import "./Navbar.css"
import { assets } from "../../assets/assets.js"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={assets.logo} alt="" />
        <span>
          <b>{"  >>>> "}</b>Admin Panel<i>.</i>
        </span>
      </div>
      <img className="profile" src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
