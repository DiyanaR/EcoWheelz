import React from "react";
import "../css/Footer.css";
import { useState, useEffect } from "react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <a href="#top" className="arrow-container" onClick={scrollToTop}>
        <img className="arrow-icon" src="/icons/VectorArrow.png" alt="icon" />
      </a>
      <footer className="footer">
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
      </footer>
    </>
  );
}
export default Footer;
