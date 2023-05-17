import React from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-link">work with us</p>
          <p className="footer-link">privacy Policy</p>
          <p className="footer-link">terms and conditions</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">FAQ</h3>
          <p className="footer-link">shipping and returns</p>
          <p className="footer-link">store policy</p>
          <p className="footer-link">Payments</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Contact</h3>
          <p className="footer-link">939399393</p>
          <p className="footer-link">-----</p>
          <p className="footer-link">-----</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
