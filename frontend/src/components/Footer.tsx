import React from "react";
import "../css/Footer.css";
import { useState, useEffect, useRef } from "react";

function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const handletopClick = () => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* <div ref={categoriesRef}>
        <div className="arrow-container">
          <button className="top-to-btm" onClick={handletopClick}>
            <img
              className="arrow-icon"
              src="/icons/VectorArrow.png"
              alt="icon"
            />
          </button>
        </div>
      </div> */}
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
