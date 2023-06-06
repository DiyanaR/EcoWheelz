import React from "react";
import "../css/Footer.css";


function Footer() {
  return (
    <>
      <div className="footer">

        <hr className="Productfooter-line" />
        <div className="footer-container">
        <div className="desktop-icon">
          <img src="/logo/Logo-desktop.png" alt="Desktop Icon" className="logo-image" />
        </div>
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
            <p className="footer-link">
            <img className="phone-icon" src="./icons/phone.png" alt="Phone Icon" />
            <span>+ 46 745 343 21</span>
            </p>
            <p className="footer-link">
              <img className="person-icon" src="./icons/person.png" alt="person icon" />
              <span>Gloryroad1</span>
            </p>
            <p className="footer-link">
              <img className="mail-icon" src="./icons/mail.png" alt="mejl icon" />
              <span>service@eccowheelz.com</span>
            </p>
          </div>

          <div className="icon-container">
          <div className="instagramicon">
          <img
                className="footer-icons"
                src="./icons/instagram.png"
                alt="logo"
              />
            </div>
            <div className="facebookicon">
          <img className="footer-icons" src="./icons/fb.png" alt="logo" />
          </div>
          </div>
          {/* <p className="copyright-text">
            2023 Ecowheelz AB. All rights reserved
          </p> */}

        </div>
      </div>
    </>
  );
}

export default Footer;
