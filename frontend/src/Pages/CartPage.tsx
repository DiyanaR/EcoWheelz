import { useState, SetStateAction } from "react";
import styled from "styled-components";
import Checkout from "../components/Checkout";
import CartDisplay from "../components/CartDisplay";
import ConfirmOrder from "../components/ConfirmOrder";

interface CheckoutFormData {
  fullName: string;
  address: string;
  zipCode: string;
  state: string;
  paymentMethod: string;
}

export interface checkType {
  setCheckPoint: React.Dispatch<SetStateAction<number>>;
}

interface formType {
  formData: CheckoutFormData;
  setFormData: React.Dispatch<SetStateAction<CheckoutFormData>>;
}

export interface exportedProps extends checkType, formType {}

export default function CartPage() {
  const [checkpoint, setCheckpoint] = useState(2);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    address: "",
    zipCode: "",
    state: "",
    paymentMethod: "",
  });

  return (
    <MainCartPage>
      <div className="progress-bar">
        <div className="checkpoint">
          <span className="text-active">Cart</span>
          <div className="ball ball-active" />
        </div>

        <div className={checkpoint >= 1 ? "line line-active" : "line"} />

        <div className="checkpoint">
          <span className={checkpoint >= 1 ? "text text-active" : "text"}>
            Checkout
          </span>
          <div className={checkpoint >= 1 ? "ball ball-active" : "ball"} />
        </div>

        <div className={checkpoint >= 2 ? "line line-active" : "line"} />

        <div className="checkpoint">
          <span className={checkpoint >= 2 ? "text text-active" : "text"}>
            Confirmation
          </span>
          <div className={checkpoint >= 2 ? "ball ball-active" : "ball"} />
        </div>
      </div>

      <div className="display-container">
        {checkpoint === 0 && <CartDisplay setCheckPoint={setCheckpoint} />}

        {checkpoint === 1 && (
          <Checkout
            formData={formData}
            setFormData={setFormData}
            setCheckPoint={setCheckpoint}
          />
        )}

        {checkpoint === 2 && (
          <ConfirmOrder
            formData={formData}
            setFormData={setFormData}
            setCheckPoint={setCheckpoint}
          />
        )}
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
        width: 50px;
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

        margin: 0 !important;
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
