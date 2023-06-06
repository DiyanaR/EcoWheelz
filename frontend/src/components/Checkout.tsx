import React, { useState, useContext } from "react";
import { ShopContext } from "./ContextProvider";

import "../css/Checkout.css";
import axios from "axios";

interface CheckoutFormData {
  fullName: string;
  address: string;
  zipCode: string;
  state: string;
  paymentMethod: string;
}

function Checkout() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    address: "",
    zipCode: "",
    state: "",
    paymentMethod: "",
  });
  const {
    userContext: { login },
    cartContext: { cartProducts },
  } = useContext(ShopContext);

  const [formErrors, setFormErrors] = useState<Partial<CheckoutFormData>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleSelectChange=(event: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = event.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


  function nameValidation(input: string) {
    return input.replace(/[!@#$%^&*()_+\-={}\[\]|\\:";'<>.,\/?0-9]/g, "");
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Partial<CheckoutFormData> = {};

    if (!formData.fullName) {
      errors.fullName = "Please enter your full name";
    }

    const firstNameValidation = nameValidation(formData.fullName);
    if (firstNameValidation.length !== formData.fullName.length) {
      errors.fullName = "   Invalid name given";
    }

    if (!formData.address) {
      errors.address = "Please enter your address";
    }

   const zipCodeValidaton=/^\d{5}$/;
    if (!formData.zipCode) {
      errors.zipCode = "Please enter your ZIP code";
    } else if (!zipCodeValidaton.test(formData.zipCode)) {
      errors.zipCode = "please enter a valid Zip code";
    }

    if (!formData.state) {
      errors.state = "Please enter your state";
    }

    if (!formData.paymentMethod) {
      errors.paymentMethod = "Please select a payment method";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    console.log(formData);
    setFormErrors({});

    setFormData({
      fullName: "",
      address: "",
      zipCode: "",
      state: "",
      paymentMethod: "",
    });
  };

  async function handlePurchase() {
    if (login) {
      const orderInfo = {
        productOrders: cartProducts.map((item) => ({
          orderId: item.id,
          quantity: item.quantity,
        })),
        fullName: formData.fullName,
        adress: formData.address,
        ZipCode: formData.zipCode,
        state: formData.state,
        paymentMethod: formData.paymentMethod,

      };

      try {
        await axios.post("http://localhost:8080/order", {
          headers: { Authorization: `Bearer ${login.token}` },
          data: orderInfo,
        });

      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="checkout-page">
      <form className="form-border" onSubmit={handleSubmit}>
        <label className="label">
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="input"
          />
          {formErrors.fullName && (
            <span className="error-message">{formErrors.fullName}</span>
          )}
        </label>
        <br />
        <label className="label">
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="input"
          />
          {formErrors.address && (
            <span className="error-message">{formErrors.address}</span>
          )}
        </label>
        <br />
        <label className="label">
          ZIP Code:
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="input"
          />
          {formErrors.zipCode && (
            <span className="error-message">{formErrors.zipCode}</span>
          )}
        </label>
        <br />
        <label className="label">
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="input"
          />
          {formErrors.state && (
            <span className="error-message">{formErrors.state}</span>
          )}
        </label>
        <br />

        <label className="label">
          Payment Method:
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            className="input"
            onChange={handleSelectChange}
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          {formErrors.paymentMethod && (
            <span className="error-message">{formErrors.paymentMethod}</span>
          )}
        </label>
        <br />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Checkout;
