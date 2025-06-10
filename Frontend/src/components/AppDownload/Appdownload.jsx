import React from "react"
import "./Appdownload.css"
import { assets } from "../../assets/frontend_assets/assets"
const Appdownload = () => {
  return (
    <div className="app-download" id="app-download">
      <p>
        For better expereince Download <br />
        FuelSip App
      </p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="Play Store" />
        <img src={assets.app_store} alt="App Store" />
      </div>
    </div>
  )
}

export default Appdownload
