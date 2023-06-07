import { useContext, useState } from "react";
import { exportedProps } from "../Pages/CartPage";
import { ShopContext } from "./ContextProvider";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router";
import ErrorPopup from "./ErrorPopup";

export default function ConfirmOrder({
  formData,
  setFormData,
  setCheckPoint,
}: exportedProps) {
  const {
    userContext: { login },
    cartContext: { cartProducts, setCartProducts },
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);

  async function handlePurchase() {
    if (login) {
      const orderInfo = {
        productOrders: cartProducts.map((item) => ({
          orderId: item.id,
          quantity: item.quantity,
        })),
        fullName: formData.fullName,
        address: formData.address,
        zipCode: formData.zipCode,
        state: formData.state,
        paymentMethod: formData.paymentMethod,
      };

      try {
        const res = await axios.post("http://localhost:8080/order", {
          headers: { Authorization: `Bearer ${login.token}` },
          data: orderInfo,
        });

        if (res.status === 201) {
          setCartProducts([]);
          navigate("/confirmation");
        } else {
          setErrorMsg(true);

          setTimeout(() => {
            setErrorMsg(true);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <ConfirmOrderDiv>
      <h2>Is this information correct?</h2>
      <div className="order-display">
        <div className="order-item">
          <p className="order-info-heading">Delivery information</p>

          <div className="delivery-info">
            <p className="delivery-row">
              Name: <span className="highlight">{formData.fullName}</span>
            </p>
            <p className="delivery-row">
              Address: <span className="highlight">{formData.address}</span>
            </p>
            <p className="delivery-row">
              Zip code: <span className="highlight">{formData.zipCode}</span>
            </p>
            <p className="delivery-row">
              City: <span className="highlight">{formData.state}</span>
            </p>
            <p className="delivery-row">
              Payment method:{" "}
              <span className="highlight">{formData.paymentMethod}</span>
            </p>
          </div>

          <p className="order-info-heading">Product information</p>
          <div className="product-info">
            <div className="product-item-container">
              {cartProducts.map((product) => {
                return (
                  <div key={product.title} className="product-item">
                    <div className="img-border">
                      <img src={product.img} alt={product.title} />
                    </div>

                    <div className="product-details">
                      <div className="top-info">
                        <p className="title">{product.title}</p>
                        <p className="price">{product.price} :-</p>
                      </div>

                      <p className="quantity">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="price-display">
              <p>Product(s): {cartProducts.length}</p>
              <p>
                Total:{" "}
                {cartProducts
                  .reduce((acc, product) => {
                    return acc + product.price * product.quantity;
                  }, 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                :-
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-container">
        <button className="edit-btn" onClick={() => setCheckPoint(1)}>
          Edit
        </button>
        <button className="confirm-btn" onClick={handlePurchase}>
          Confirm
        </button>
      </div>
      <ErrorPopup errorMsg={errorMsg} />
    </ConfirmOrderDiv>
  );
}

const ConfirmOrderDiv = styled.div`
  color: white;
  max-width: 725px;
  margin: auto;
  padding: 25px;

  .btn-container {
    margin: auto;
    width: fit-content;

    button {
      background-color: #222222;
      border: 2px solid #9ae5bd;
      color: white;
      border-radius: 12px;
      padding: 6px 16px;
      font-size: 18px;
      font-weight: 700;
      margin: 0 16px;
      cursor: pointer;

      &:hover {
        background-color: #9ae5bd;
        color: #222222;
      }
    }
  }

  .order-item {
    * {
      margin: 0;
      padding: 0;
    }
    background: #222222;
    border: 2px solid #222222;
    box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.25);
    border-radius: 16px;

    margin-bottom: 38px;
    padding: 0 18px 18px 18px;

    position: relative;

    transition: all 0.4s ease;

    &:hover {
      border: 2px solid #9ae5bd;
    }

    .order-info-heading {
      font-weight: 700;
      font-size: 18px;
      color: #e9e9e9;
      padding: 8px;
    }

    .delivery-info {
      border: 1px solid #646464;
      border-radius: 16px;
      padding: 12px 24px;

      .delivery-row {
        color: #d9d9d9;
        line-height: 23px;
        font-size: 16px;

        .highlight {
          color: white;
        }
      }
    }

    .product-info {
      border: 1px solid #646464;
      border-radius: 16px;
      padding: 18px 24px;

      .product-item-container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .product-item {
          box-shadow: 0px 2px 6px 3px rgba(0, 0, 0, 0.25);
          border-radius: 8px;
          padding: 3px;

          display: flex;
          align-items: center;

          .img-border {
            height: 72px;
            width: 72px;

            img {
              height: 100%;
              border-radius: 10px;
            }
          }

          .product-details {
            width: 100%;
            padding: 8px;

            .top-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;

              p {
                font-size: 16px;
              }

              .title {
                font-weight: 700;
              }
            }
          }
        }
      }

      .price-display {
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        border-top: 3px solid #9ae5bd;
        padding: 8px 0;
        margin-top: 8px;

        p {
          font-size: 16px;
        }
      }
    }
  }
`;
