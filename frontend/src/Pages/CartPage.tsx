import { useState, useContext } from "react";
import styled from "styled-components";
import Checkout from "../components/Checkout";
import CartDisplay from "../components/CartDisplay";
import { ShopContext } from "../components/ContextProvider";
import axios from "axios";

export default function CartPage() {
  const [checkpoint, setCheckpoint] = useState("cart");
  const {
    userContext: { login },
    cartContext: { cartProducts },
  } = useContext(ShopContext);

  async function handlePurchase() {
    if (login) {
      const orderInfo = {
        productOrders: cartProducts.map((item) => ({
          orderId: item.id,
          quantity: item.quantity,
        })),
        fullName: "FullnameTest",
        address: "SomeStreet123",
        zipCode: "123 45",
        state: "Gothenburg",
        paymentMethod: "creditCard",
      };

      console.log(orderInfo);

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
    <MainCartPage>
      <div className="progress-bar">
        <div className="checkpoint">
          <span className="text-active">Cart</span>
          <div className="ball ball-active" />
        </div>

        <div
          className={checkpoint === "checkout" ? "line line-active" : "line"}
        />

        <div className="checkpoint">
          <span>Checkout</span>
          <div
            className={checkpoint === "checkout" ? "ball ball-active" : "ball"}
          />
        </div>

        <div
          className={checkpoint === "confirm" ? "line line-active" : "line"}
        />

        <div className="checkpoint">
          <span>Confirmation</span>
          <div
            className={checkpoint === "confirm" ? "ball ball-active" : "ball"}
          />
        </div>
      </div>

      <div className="display-container">
        {checkpoint === "cart" && (
          <CartDisplay checkPoint={checkpoint} setCheckPoint={setCheckpoint} />
        )}

        {checkpoint === "checkout" && <Checkout />}
      </div>
    </MainCartPage>
  );
}

const MainCartPage = styled.div`
  * {
    box-sizing: border-box;
  }

  box-sizing: border-box;
  min-height: 100dvh;
  padding: 60px 0;
  font-family: "Red Hat Display";

  .progress-bar {
    width: 440px;
    height: 100px;
    margin: auto;

    display: flex;
    align-items: center;
    justify-content: center;

    .line {
      width: 125px;
      height: 3px;
      background-color: #9ae5bd92;

      transition: all 0.7s ease;

      @media (max-width: 555px) {
        width: 100px;
      }
    }

    .line-active {
      background-color: #9ae5bd;
    }

    .checkpoint {
      position: relative;

      span {
        display: block;
        position: absolute;

        top: -38px;
        left: 50%;
        transform: translateX(-50%);

        color: #ffffff97;
        font-weight: 600;
        font-size: 20px;

        @media (max-width: 555px) {
          top: -28px;
          font-size: 16px;
        }
      }

      .text-active {
        color: white;
      }

      .ball {
        height: 50px;
        width: 50px;
        border-radius: 25px;
        border: 3px solid #9ae5bd92;

        background-color: transparent;
        transition: all 0.7s ease;
      }

      .ball-active {
        border: 3px solid #9ae5bd !important;
      }
    }
  }
`;
