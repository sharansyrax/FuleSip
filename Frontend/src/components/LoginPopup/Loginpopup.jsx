import React from "react"
import "./Loginpopup.css"
import { useState } from "react"
import { assets } from "../../assets/frontend_assets/assets"
import { useCallback } from "react"
import { useContext } from "react"
import { StoreContext } from "../../Context/StoreContext"
import axios from "axios"

const Loginpopup = ({ setshowLogin }) => {
  const [currState, setcurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { url, token, setToken } = useContext(StoreContext)
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url
    if (currState === "Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl, data)
    console.log(response.data.token)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setshowLogin(false)
    } else {
      alert(response.data.message)
    }
  }
  {
    console.log(setshowLogin)
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setshowLogin(false)}
            src={assets.cross_icon}
          ></img>
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            ></input>
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="text"
            placeholder="Your email"
            required
          ></input>
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="text"
            placeholder="Your password"
            required
          ></input>
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required></input>
          <p>By continuing ,I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create Account?
            <span onClick={() => setcurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setcurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default Loginpopup
