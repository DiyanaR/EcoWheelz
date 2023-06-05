
import React, { useState } from 'react';
import "../css/Checkout.css";

interface CheckoutFormData {
  name: string;
  address: string;
  zipCode: string;
  state: string;
  paymentMethod: string;
}

const CheckoutPage = () => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    address: '',
    zipCode: '',
    state: '',
    paymentMethod: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<CheckoutFormData>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Partial<CheckoutFormData> = {};

    if (!formData.name) {
      errors.name = "Please enter your full name";
    }

    if (!formData.address) {
      errors.address = "Please enter your address";
    }

    if (!formData.zipCode) {
      errors.zipCode = "Please enter your ZIP code";
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
      name: '',
      address: '',
      zipCode: '',
      state: '',
      paymentMethod: '',
    });
  };

  return (

    <div className="checkout-page">
      <form className="form-border" onSubmit={handleSubmit}>
        <label className="label">
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input"
          />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}
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
          {formErrors.address && <span className="error-message">{formErrors.address}</span>}
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
          {formErrors.zipCode && <span className="error-message">{formErrors.zipCode}</span>}
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
          {formErrors.state && <span className="error-message">{formErrors.state}</span>}
        </label>
        <br />

        <label className="label">
          Payment Method:
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            className="input"
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          {formErrors.paymentMethod && <span className="error-message">{formErrors.paymentMethod}</span>}
        </label>
        <br />
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
