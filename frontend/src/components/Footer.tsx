import React from "react";
import "../css/Footer.css";
import { useState, useEffect, useRef } from "react";

function Footer() {
  return (
    <>
      <div className="footer">
        <hr className="Productfooter-line" />
        <div className="footer-container">
          <div className="footer-column">
            <h3 className="footer-heading">About Us</h3>
            <p className="footer-link">Work with us</p>
            <p className="footer-link">privacy policy</p>
            <p className="footer-link">Terms and conditions</p>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">FAQ</h3>
            <p className="footer-link">Shipping and returns</p>
            <p className="footer-link">Store policy</p>
            <p className="footer-link">Payments</p>
          </div>
          <div className="footer-column">
            <h3 className="footer-heading">Contact</h3>
            <p className="footer-link">+ 46 745 343 21</p>
            <p className="footer-link">Gloryroad1</p>
            <p className="footer-link">service@eccowheelz.com</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
