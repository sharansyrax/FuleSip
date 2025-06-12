import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import Loginpopup from "./components/LoginPopup/Loginpopup.jsx";
import Verify from "./pages/verify/Verify.jsx";
import MyOrders from "./pages/Myorders/MyOrders.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showLogin, setshowLogin] = useState(false);

  useEffect(() => {
    console.log(showLogin);
  }, [showLogin]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {showLogin && <Loginpopup setshowLogin={setshowLogin} />}

      <div className="app">
        <Navbar setshowLogin={setshowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;
