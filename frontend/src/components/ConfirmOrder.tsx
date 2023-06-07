import { useContext } from "react";
import { exportedProps } from "../Pages/CartPage";
import { ShopContext } from "./ContextProvider";
import axios from "axios";

export default function ConfirmOrder({
  formData,
  setFormData,

  setCheckPoint,
}: exportedProps) {
  const {
    userContext: { login },
    cartContext: { cartProducts, setCartProducts },
  } = useContext(ShopContext);

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

      console.log(orderInfo);

      // try {
      //   await axios.post("http://localhost:8080/order", {
      //     headers: { Authorization: `Bearer ${login.token}` },
      //     data: orderInfo,
      //   });
      // } catch (error) {
      //   console.log(error);
      // }
    }
  }

  return (
    <>
      <div>ConfirmOrder</div>
      <button onClick={handlePurchase}>Test</button>
    </>
  );
}
