import { useState } from "react";
import styled from "styled-components";
import Checkout from "../components/Checkout";

export default function CartPage() {
  const [checkpoint, setCheckpoint] = useState("cart");

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
        {checkpoint === "cart" && <div>test</div>}

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
      }

      .ball-active {
        border: 3px solid #9ae5bd !important;
      }
    }
  }
`;
