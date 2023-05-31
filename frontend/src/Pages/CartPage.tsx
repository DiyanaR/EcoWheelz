import { Link } from "react-router-dom";
import styled from "styled-components";

export default function CartPage() {
  return (
    <MainCartPage>
      <div className="progress-bar">
        <div className="checkpoint">
          <span>Cart</span>
          <div className="ball" />
        </div>

        <div className="line" />

        <div className="checkpoint">
          <span>Checkout</span>
          <div className="ball" />
        </div>

        <div className="line" />

        <div className="checkpoint">
          <span>Confirmation</span>
          <div className="ball" />
        </div>
      </div>
      <h1>cartpage</h1>
      <Link to="/checkout">
        <button>checkout</button>
      </Link>
    </MainCartPage>
  );
}

const MainCartPage = styled.div`
  min-height: 100dvh;
  padding: 20px;
`;
