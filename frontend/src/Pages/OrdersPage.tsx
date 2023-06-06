import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../components/ContextProvider";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../components/ErrorPopup";
import axios from "axios";
import { ReactComponent as CogIcon } from "../assets/settings.svg";

interface Order {
  state: string;
  address: string;
  order_id: string;
  products: Product[];
  zip_code: string;
  full_name: string;
  order_date: string;
  payment_method: string;
}

interface Product {
  img: string;
  title: string;
  price: number;
  quantity: number;
}

export default function OrdersPage() {
  const {
    userContext: { login },
  } = useContext(ShopContext);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showSettings, setShowSettings] = useState<string | null>(null);
  const [cancelNotif, setCancelNotif] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    if (!login) return navigate("/");

    try {
      const result = await axios.get("http://localhost:8080/orders-list", {
        headers: { Authorization: `Bearer ${login.token}` },
      });

      const userOrders: Order[] = result.data;

      console.log(userOrders);
      setOrders(userOrders);
    } catch (error) {
      console.log(error);

      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 2000);
    }
  }

  async function cancelOrder(order_id: string) {
    if (login) {
      try {
        await axios.delete("http://localhost:8080/order-cancel", {
          headers: { Authorization: `Bearer ${login.token}` },
          data: { order_id },
        });

        getOrders();

        setCancelNotif(true);
        setTimeout(() => {
          setCancelNotif(false);
        }, 2000);
      } catch (error) {
        console.log(error);

        setErrorMsg(true);
        setTimeout(() => {
          setErrorMsg(false);
        }, 2000);
      }
    }
  }

  return (
    <MainOrders>
      {login && (
        <>
          <h2 className="welcome">Welcome {login.firstName}</h2>
          <h3 className="sub-welcome">Here are your orders</h3>

          <div className="order-display">
            {orders &&
              orders.map((order) => {
                return (
                  <div key={order.order_id} className="order-item">
                    <p className="order-id">Order ID: {order.order_id}</p>

                    <div className="menu-container">
                      <p className="order-info-heading">Delivery information</p>
                      <CogIcon
                        onClick={() => {
                          if (showSettings) setShowSettings(null);
                          else setShowSettings(order.order_id);
                        }}
                      />

                      {showSettings && order.order_id === showSettings && (
                        <div className="menu">
                          <p onClick={() => cancelOrder(order.order_id)}>
                            Cancel order
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="delivery-info">
                      <p className="delivery-row">
                        Name:{" "}
                        <span className="highlight">{order.full_name}</span>
                      </p>
                      <p className="delivery-row">
                        Address:{" "}
                        <span className="highlight">{order.address}</span>
                      </p>
                      <p className="delivery-row">
                        Zip code:{" "}
                        <span className="highlight">{order.zip_code}</span>
                      </p>
                      <p className="delivery-row">
                        City: <span className="highlight">{order.state}</span>
                      </p>
                      <p className="delivery-row">
                        Payment method:{" "}
                        <span className="highlight">
                          {order.payment_method}
                        </span>
                      </p>
                      <p className="delivery-row">
                        Order date:{" "}
                        <span className="highlight">{order.order_date}</span>
                      </p>
                    </div>

                    <p className="order-info-heading">Product information</p>
                    <div className="product-info">
                      <div className="product-item-container">
                        {order.products.map((product) => {
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

                                <p className="quantity">
                                  Quantity: {product.quantity}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="price-display">
                        <p>Product(s): {order.products.length}</p>
                        <p>
                          Total:{" "}
                          {order.products
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
                );
              })}
          </div>
          <ErrorPopup errorMsg={errorMsg} />
          {cancelNotif && (
            <div className="cancel-notif">
              <span>Your order has been cancelled</span>
            </div>
          )}

          {orders?.length === 0 && (
            <h2 className="no-orders">No orders have been placed</h2>
          )}
        </>
      )}
    </MainOrders>
  );
}

const MainOrders = styled.div`
  * {
    padding: 0;
    margin: 0;
  }

  min-height: 100dvh;
  max-width: 890px;
  margin: auto;
  padding: 30px 0;

  color: white;

  .welcome {
    font-size: 48px;
    line-height: 40px;
    padding: 0 16px;
  }

  .sub-welcome {
    font-size: 29px;
    font-weight: 300;
    padding: 0 16px;
  }

  @media (max-width: 525px) {
    .welcome {
      font-size: 28px;
    }

    .sub-welcome {
      font-size: 16px;
    }
  }

  .no-orders {
    text-align: center;
    padding: 20px 0;
  }

  .cancel-notif {
    background: linear-gradient(
      180deg,
      #222222 41.15%,
      rgba(34, 34, 34, 0.9) 77.08%,
      rgba(34, 34, 34, 0.95) 92.71%
    );

    width: 80%;
    padding: 16px !important;

    border: 3px solid #9ae5bd;
    border-radius: 16px;

    color: white;
    font-weight: 700;
    font-family: "Red Hat Display";
    font-size: 20px;

    position: fixed;
    left: 50%;
    bottom: 100px;
    transform: translateX(-50%);

    .float-right {
      float: right;
      display: block;
    }
  }

  .order-display {
    max-width: 510px;
    margin: 18px auto;

    .order-item {
      background: #222222;
      border: 2px solid #222222;
      box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.25);
      border-radius: 16px;

      margin-bottom: 38px;
      padding: 25px;

      position: relative;

      transition: all 0.4s ease;

      &:hover {
        border: 2px solid #9ae5bd;
      }

      .menu-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        svg {
          fill: white;
          width: 22px;
          height: 22px;
          cursor: pointer;

          &:hover {
            fill: #9ae5bd;
          }
        }

        .menu {
          position: absolute;
          top: 40px;
          right: -20px;

          background-color: #222222;
          border-radius: 8px;
          box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.25);
          padding: 20px;

          color: #ff4949;

          p {
            cursor: pointer;

            &:hover {
              color: #ff0101;
            }
          }
        }
      }

      .order-id {
        position: absolute;
        font-weight: 400;
        font-size: 14px;
        top: 6px;
        left: 16px;
        color: #d9d9d9;
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
  }
`;
