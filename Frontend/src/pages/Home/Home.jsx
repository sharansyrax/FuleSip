import React from "react"
import "./Home.css"
import Header from "../../components/Header/Header.jsx"
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx"
import { useState } from "react"
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx"
import Footer from "../../components/Footer/Footer.jsx"
import Appdownload from "../../components/AppDownload/Appdownload.jsx"

const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}></ExploreMenu>
      <FoodDisplay category={category}></FoodDisplay>
      <Appdownload></Appdownload>
    </div>
  )
}

export default Home
