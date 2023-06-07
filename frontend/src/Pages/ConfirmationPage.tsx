import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Confirmation.css";
import { ReactComponent as CheckboxIcon } from "../assets/checkbox.svg";
import { ReactComponent as FbIcon } from "../assets/facebook.svg";
import { ReactComponent as InstagramIcon } from "../assets/instagram.svg";

export default function Confirmation() {
  return (
    <>
      <div className="confirmation-box">
        <Link to="/productpage">
          <div className="confirmation-productbutton">
            <button className="product-button">Back to products</button>
          </div>
        </Link>
        <div className="confirmation-container">
          <CheckboxIcon className="checkbox-icon" />
          <h1 className="confirmation-header">Thank you!</h1>
          <div className="confirmation-textcontainer">
            <p className="confirmation-textone">
              A confirmation has been sent to: xxx@xxxxxx.xxx
            </p>
            <p className="confirmation-texttwo">
              Congratulations on your purchase of our electric scooter or/and
              helmet! We appreciate your trust in us and are thrilled to have
              you as part of our community.
            </p>
          </div>
          <p className="confirmation-texttree">
            Are you interested in getting Ecowheelz-news and information about
            discounts?
          </p>
          <div className="confirmation-inputcontainer">
            <div>
              <input
                className="confirmation-input"
                type="E-mail"
                value="E-mail"
              />
            </div>
            <div>
              <button className="product-button">Sign me up!</button>
            </div>
          </div>
          <div>
            <p className="confirmation-text">Let´s be friends!</p>
            <div className="confirmation-icons">
              <FbIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
