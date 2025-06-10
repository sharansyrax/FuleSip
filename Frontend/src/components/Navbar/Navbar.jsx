import React, { useContext, useState } from "react"
import "./Navbar.css"
import { assets } from "../../assets/frontend_assets/assets.js"
import { Link, useNavigate } from "react-router-dom"
import { StoreContext } from "../../Context/StoreContext"
const Navbar = ({ setshowLogin }) => {
  const [menu, setmenu] = useState("home")
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="logo"></img>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => {
            setmenu("home")
          }}
          className={menu == "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setmenu("menu")
          }}
          className={menu == "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setmenu("mobile-app")
          }}
          className={menu == "mobile-app" ? "active" : ""}
        >
          mobile app
        </a>
        <a
          href="#footer"
          onClick={() => {
            setmenu("contact us")
          }}
          className={menu == "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <lord-icon
          src="https://cdn.lordicon.com/wjyqkiew.json"
          trigger="hover"
          style={{ width: "40px", height: "40px" }}
        ></lord-icon>
        <div className="navbar-search-icon">
          <Link to="/cart">
            <lord-icon
              src="https://cdn.lordicon.com/ggirntso.json"
              trigger="hover"
              style={{ width: "40px", height: "40px" }}
            ></lord-icon>
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button
            onClick={() => {
              setshowLogin(true)
            }}
          >
            Sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon}></img>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.cart_icon}></img>
                <p>Orders</p>
              </li>
              <hr></hr>
              <li onClick={logout}>
                <img src={assets.logout_icon}></img>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
