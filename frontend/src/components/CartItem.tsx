import { useContext } from "react";
import { ShopContext } from "./ContextProvider";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import styled from "styled-components";

export default function CartItem() {
  const {
    cartContext: { cartProducts, setCartProducts },
  } = useContext(ShopContext);

  function deleteCartItem(id: number) {
    const updatedCart = cartProducts.filter((item) => item.id !== id);

    setCartProducts(updatedCart);
  }

  function updateCartItem(id: number, operator: string) {
    const updatedCart = cartProducts.map((item) => {
      if (item.id === id) {
        if (operator === "increment") {
          item.amount++;
        } else if (operator === "decrement" && item.amount > 1) {
          item.amount--;
        }
      }
      return item;
    });

    setCartProducts(updatedCart);
  }

  return (
    <>
      {cartProducts &&
        cartProducts.map((item) => {
          return (
            <CartItemDiv key={item.id} className="cart-item">
              <div className="cart-img-container">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="item-info">
                <div className="item-title">
                  {item.title}
                  <div className="item-amount">
                    <div
                      onClick={() => {
                        updateCartItem(item.id, "decrement");
                      }}
                      className="decrement"
                    >
                      -
                    </div>
                    <div>{item.amount}x</div>
                    <div
                      onClick={() => {
                        updateCartItem(item.id, "increment");
                      }}
                      className="increment"
                    >
                      +
                    </div>
                  </div>
                </div>
                <p className="item-subtitle">{item.subtitle}</p>
                <div className="item-bottom-info">
                  <p className="item-price">{item.price} :-</p>
                  <button> View product</button>
                </div>
              </div>
              <CloseIcon
                onClick={() => {
                  deleteCartItem(item.id);
                }}
                className="delete-icon"
              />
            </CartItemDiv>
          );
        })}
    </>
  );
}

const CartItemDiv = styled.div`
  display: flex;
  padding: 12px;
  background: #222222;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 553px;
  color: white;
  font-weight: 600;
  border-radius: 30px;

  margin-bottom: 16px;
  border: 2px solid transparent;

  transition: all 0.3s ease;
  position: relative;
  padding: 8px !important;

  &:hover {
    border: 2px solid #9ae5bd;
  }

  .cart-img-container {
    width: 200px;
    height: 200px;

    img {
      height: 100%;
      border-radius: 24px;
    }
  }

  .item-info {
    padding: 40px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;

    .item-title {
      font-size: 20px;
      display: flex;

      .item-amount {
        display: flex;
        gap: 4px;
        margin-left: auto;
        position: relative;
        user-select: none;

        .increment,
        .decrement {
          font-size: 32px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #9ae5bd;

          &:hover {
            color: white;
            cursor: pointer;
          }
        }

        .increment {
          right: -24px;
        }

        .decrement {
          left: -24px;
          top: 44%;
        }
      }
    }

    .item-subtitle {
      font-size: 16px;
    }

    .item-bottom-info {
      display: flex;
      font-weight: 700;

      .item-price {
        font-size: 24px;
        font-weight: inherit;
      }

      button {
        margin-left: auto;
        font-weight: inherit;
        font-size: 14px;
        color: inherit;
        background-color: transparent;
        border-radius: 12px;
        padding: 8px;
        border: 2px solid #9ae5bd;
        cursor: pointer;

        &:hover {
          color: #222222;
          background-color: #9ae5bd;
        }
      }
    }
  }

  .delete-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 16px;
    height: 16px;
    path {
      cursor: pointer;
    }
  }

  @media (max-width: 555px) {
    width: 385px;

    .cart-img-container {
      width: 110px;
      height: 110px;
    }

    .item-info {
      padding: 8px 0 8px 30px;

      .item-title {
        position: relative;
        .item-amount {
          position: absolute;
          right: 30px;
          bottom: -25px;
        }
      }

      .item-bottom-info {
        align-items: center;
        .item-price {
          font-size: 20px;
        }

        button {
          padding: 6px 8px;
        }
      }
    }
  }
`;
