import React from "react"
import "./Footer.css"
import { assets } from "../../assets/frontend_assets/assets"

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left" id="image">
          <img
            src={assets.logowithoutbg}
            className="footer-content-left-image"
          ></img>
          <p>
            FuelSip delivers high-quality, protein-packed products to power your
            lifestyle. From fitness essentials to healthy snacks, we help you
            fuel your body with clean, nutritious options — all in one place.
            Built with performance and convenience in mind.
          </p>
          <div className="footer-social-media-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTACT US</h2>
          <ul>
            <li>+91 85855555858</li>
            <li>contact.fulesip@fuelsip.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 FuelSip.com All rights reserved
      </p>
    </div>
  )
}

export default Footer
