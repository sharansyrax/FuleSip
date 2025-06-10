import { useState } from "react"
import Navbar from "./components/Navbar/Navbar.jsx"
import "./App.css"
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import Add from "./pages/Add/Add.jsx"
import List from "./pages/List/List.jsx"
import Orders from "./pages/Orders/Orders.jsx"

import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const url = "http://localhost:4000"
  return (
    <div>
      <ToastContainer />
      <Navbar></Navbar>
      <hr></hr>
      <div className="app-content">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/add" element={<Add url={url}></Add>}></Route>
          <Route path="/list" element={<List url={url}></List>}></Route>
          <Route path="/orders" element={<Orders url={url}></Orders>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
