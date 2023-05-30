import React from "react";
import "../css/Footer.css";
import { useState, useEffect } from "react";
import "../css/Footer.css";

function FooterMobile() {
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const toggleContactDetails = () => {
    setShowContact(!showContact);
  };

  const toggleAboutusDetails = () => {
    setShowAbout(!showAbout);
  };

  const toggleFaqDetails = () => {
    setShowFAQ(!showFAQ);
  };
  return (
    <>
      {/* <div className="footericon-box"> */}
      <div className="footer-box">
        <div className="footericon-box">
          <div className="footer-dropdownbox">
            <div className="footer-textheader" onClick={toggleContactDetails}>
              <p className="footer-text">Contact</p>

              <div className="footer-iconarrow">
                <img src="./icons/footer-arrow.png" alt="" />
              </div>
            </div>

            {showContact && (
              <div className="detail-info">
                <div className="icon-text">
                  <div className="icon-container">
                    <img
                      src="./icons/phone.png"
                      alt=""
                      className="footer-icon"
                    />
                  </div>
                  <p className="footer-text">Work with us</p>
                </div>
                <div className="icon-text">
                  <div className="icon-container">
                    <img
                      src="./icons/person.png"
                      alt=""
                      className="footer-icon"
                    />
                  </div>
                  <p className="footer-text">Privacy policy</p>
                </div>
                <div className="icon-text">
                  <div className="icon-container">
                    <img
                      src="./icons/mail.png"
                      alt=""
                      className="footer-icon"
                    />
                  </div>
                  <p className="footer-text">Terms and conditions</p>
                </div>
              </div>
            )}
          </div>
          {/* <div className="footer-logo">
            <img src="./logo/Logo-desktop.png" alt="icon" />
          </div> */}
        </div>

        <div className="footer-dropdownbox">
          <div className="footer-textheader" onClick={toggleAboutusDetails}>
            <p className="footer-text">About us</p>
            {/* <img src="" alt="" /> */}
            <div className="footer-iconarrow">
              <img src="./icons/footer-arrow.png" alt="" />
            </div>
          </div>
          {showAbout && (
            <div className="detail-info">
              <p className="footer-text"> + 46 745 343 21</p>
              <p className="footer-text">Gloryroad1</p>
              <p className="footer-text">service@eccowheelz.com</p>
            </div>
          )}
        </div>

        <div className="footer-dropdownbox">
          <div className="footer-textheader" onClick={toggleFaqDetails}>
            <p className="footer-text">FAQ</p>
            <div className="footer-iconarrow">
              <img src="./icons/footer-arrow.png" alt="" />
            </div>
          </div>
          {showFAQ && (
            <div className="detail-info">
              <p className="footer-text">Shipping and returns</p>
              <p className="footer-text">Store policy</p>
              <p className="footer-text">Payments</p>
            </div>
          )}
        </div>
        <p className="copyright-text">2023 Ecowheelz AB. All rights reserved</p>
      </div>
    </>
  );
}

export default FooterMobile;
