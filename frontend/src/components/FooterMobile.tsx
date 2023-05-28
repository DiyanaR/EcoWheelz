import React from "react";
import "../css/Footer.css";
import { useState, useEffect } from "react";
import "../css/Footer.css";

function FooterMobile() {
  return (
    <>
      <footer className="footer-dropdown">
        <div className="">
          <select value="Contact" className="dropdown-boxes">
            {" "}
            <option value=""> Contact</option>
            <option value="">+ 46 745 343 21</option>
            <option value="">Gloryroad1</option>
            <option value="">service@eccowheelz.com</option>
          </select>
        </div>
        <div className="">
          <select name="About us" id="" className="dropdown-boxes">
            <option value="">About us</option>
            <option className="drowndown-boxes" value="">
              Work with us
            </option>
            <option className="drowndown-boxes" value="">
              Privacy policy
            </option>
            <option className="drowndown-boxes" value="">
              Terms and conditions
            </option>
          </select>
        </div>
        <div className="">
          <select className="dropdown-boxes">
            <option value="">FAQ</option>
            <option value="">Shipping and returns</option>
            <option value="">Store policy</option>
            <option value="">Payments</option>
          </select>
        </div>
      </footer>
    </>
  );
}
export default FooterMobile;
