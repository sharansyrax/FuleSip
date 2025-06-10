import React from "react"
import Navbar from "./components/Navbar/Navbar.jsx"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer.jsx"
import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Loginpopup from "./components/LoginPopup/Loginpopup.jsx"
import Verify from "./pages/verify/Verify.jsx"
import MyOrders from "./pages/Myorders/MyOrders.jsx"

const App = () => {
  const [showLogin, setshowLogin] = useState(false)
  {
    console.log(showLogin)
  }
  return (
    <>
      {showLogin ? (
        <Loginpopup setshowLogin={setshowLogin}></Loginpopup>
      ) : (
        <></>
      )}

      <div className="app">
        <Navbar setshowLogin={setshowLogin}></Navbar>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
          <Route path="/order" element={<PlaceOrder />}></Route>
          <Route path="/verify" element={<Verify />}></Route>
          <Route path="/myorders" element={<MyOrders />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
