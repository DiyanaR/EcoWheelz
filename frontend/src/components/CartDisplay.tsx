import styled from "styled-components";
import { useContext, useState } from "react";
import { ShopContext } from "./ContextProvider";
import CartItem from "./CartItem";
import axios from "axios";

export default function CartDisplay() {
  const {
    cartContext: { cartProducts },
    userContext: { login },
  } = useContext(ShopContext);
  const [discount, setDiscount] = useState("");

  function cartTotal() {
    if (cartProducts) {
      let counter: number = cartProducts.reduce((acc, cartItem) => {
        return acc + cartItem.price * cartItem.quantity;
      }, 0);

      if (discount === "ECOWHEELZ") {
        counter = counter * 0.75;
      }

      //Rounds to 3 decimals
      return counter;
    }

    return 0;
  }

  function addDotToPrice(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  async function handlePurchase() {
    if (login) {
      const orderInfo = {
        productOrders: cartProducts.map((item) => ({
          orderId: item.id,
          quantity: item.quantity,
        })),
        total: cartTotal(),
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
    <CartDisplayDiv>
      <div className="cart-items-container">
        <CartItem />
      </div>
      <div className="transaction-confirm">
        <div className="transaction-container">
          <p className="heading">Shopping cart</p>
          <div className="cart-item-line-container">
            {cartProducts &&
              cartProducts.map((item) => {
                return (
                  <div key={item.id} className="cart-item-line">
                    <p>{item.title}</p>
                    <p className="item-price-line">
                      {addDotToPrice(item.price)} :-
                      <span className="amount-count">{item.quantity}x</span>
                    </p>
                  </div>
                );
              })}
          </div>

          <div className="total-amount">
            <p>Total</p>
            <p>
              {addDotToPrice(cartTotal())}
              :-
            </p>
          </div>

          <p className="shipping-text">
            *Choose shipping alternatives in the next step.
          </p>

          <div className="discount-input">
            {discount === "ECOWHEELZ" && (
              <p className="discount-notif">Applied 25% discount</p>
            )}
            <label>
              Discount Code:{" "}
              <input
                onChange={(e) => setDiscount(e.target.value)}
                type="text"
                value={discount}
              />
            </label>
          </div>
        </div>
        <button onClick={handlePurchase} className="checkout-btn">
          Checkout
        </button>
      </div>
    </CartDisplayDiv>
  );
}

const CartDisplayDiv = styled.div`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  display: flex;
  justify-content: center;
  gap: 60px;
  padding: 40px 0;

  .cart-items-container {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .transaction-confirm {
    position: sticky;
    top: 40px;
    height: fit-content;

    .transaction-container {
      padding: 40px;

      background: #222222;
      border: 1px solid #9ae5bd;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 30px;
      font-size: 20px;
      font-weight: 600;
      color: white;

      width: 475px;

      height: fit-content;

      .heading {
        text-align: center;
        padding-bottom: 40px;
      }

      .cart-item-line-container {
        padding: 0 40px;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
        gap: 28px;

        .cart-item-line {
          display: flex;
          justify-content: space-between;

          .item-price-line {
            position: relative;
            color: #ffffff;

            .amount-count {
              position: absolute;
              color: #ffffffa7;
              left: -35px;
              top: 0;
            }
          }
        }
      }

      .total-amount {
        display: flex;
        justify-content: space-between;
        padding: 10px 40px;
        border-top: 1px solid #9ae5bd;
      }

      .shipping-text {
        font-size: 16px;
        font-weight: 300;
        color: #f0f0f0;
        text-align: center;

        margin: 8px 0;
      }

      .discount-input {
        border: 1px solid #9ae5bd;
        border-radius: 50px;
        padding: 8px 24px;
        margin-top: 40px;
        position: relative;

        .discount-notif {
          position: absolute;
          left: 50%;
          top: -35px;
          transform: translateX(-50%);
          color: #9ae5bd;
          font-weight: 800;
          width: 220px;
          text-align: center;
        }

        label {
          font-weight: 00;
          font-size: 20px;
          color: #e4e4e4;

          input {
            border: none;
            width: 190px;
            padding: 0 8px;
          }
        }
      }
    }

    .checkout-btn {
      background-color: transparent;
      border: 2px solid #9ae5bd;
      font-size: 22px;
      color: white;
      padding: 12px 24px;
      border-radius: 22px;
      cursor: pointer;
      display: block;
      margin: 20px auto;

      &:hover {
        background-color: #9ae5bd;
        color: #222222;
      }
    }
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 555px) {
    .transaction-confirm {
      .transaction-container {
        padding: 30px;
        width: 300px;

        .heading {
          font-size: 18px;
        }

        .cart-item-line-container {
          padding: 0;

          .cart-item-line {
            font-size: 16px;
            .item-price-line {
              .amount-count {
                left: -25px;
              }
            }
          }
        }

        .total-amount {
          padding: 10px 0;
          font-size: 16px;
        }

        .shipping-text {
          font-size: 11px;
        }

        .discount-input {
          padding: 8px 12px;

          .discount-notif {
            font-size: 16px;
          }

          label {
            font-size: 14px;
            color: #e4e4e4;

            input {
              font-size: 14px;
              border: none;
              width: 100px;
              padding: 0 8px;
            }
          }
        }
      }

      .checkout-btn {
        font-size: 16px;
        margin: 20px auto;
        padding: 10px 32px;
        border-radius: 14px;
      }
    }
  }
`;
