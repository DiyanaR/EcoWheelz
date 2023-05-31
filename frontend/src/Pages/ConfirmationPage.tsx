import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Confirmation.css";

export default function Confirmation() {
  return (
    <>
      <Link to="/productpage">
        <div className="confirmation-productbutton">
          <button className="Product-button">Back to products</button>
        </div>
      </Link>
      <div className="confirmation-container">
        <img className="checkbox" src="./icons/checkbox.png" alt="icon" />
        <h1 className="confirmation-header">Thank you!</h1>
        <div className="confirmation-textcontainer">
          <p className="confirmation-text">
            A confirmation has been sent to: xxx@xxxxxx.xxx
          </p>
          <p className="confirmation-text">
            Congratulations on your purchase of our electric scooter or/and
            helmet! We appreciate your trust in us and are thrilled to have you
            as part of our community.
          </p>
        </div>
        <p className="confirmation-text">
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
            <button className="Product-button">Sign me up!</button>
          </div>
        </div>
        <div>
          <p className="confirmation-text">Let´s be friends!</p>
          <div className="confirmation-icons">
            <img src="./icons/instagram.png" alt="icon" />
            <img src="./icons/fb.png" alt="icon" />
          </div>
        </div>
      </div>
    </>
  );
}
