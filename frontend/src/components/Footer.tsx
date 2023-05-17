import { useState, useEffect } from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <>
      <hr className="Product-line" />

      <div className="dropdown">
        <select className="Footer-contact">
          <option value="">Contact</option>
          <option value="option1">+46 745 343 21</option>
          <option value="option2">Gloryroad 1</option>
          <option value="option3">service@ecowheelz.com</option>
        </select>
        <select>
          <option value="">About us</option>
          <option value="option1">Work with us</option>
          <option value="option2">Privacy policy</option>
          <option value="option3">Terms and conditions</option>
        </select>
        <select>
          <option value="">FAQ</option>
          <option value="option1">Shipping and returns</option>
          <option value="option2">Store policy</option>
          <option value="option3">Payments</option>
        </select>
      </div>
    </>
  );
}

export default Footer;
