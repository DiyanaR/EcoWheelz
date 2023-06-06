import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ContextProvider } from "./components/ContextProvider";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LandingPage from "./Pages/LandingPage";
import ProductPage from "./Pages/ProductPage";
import DetailPage from "./Pages/DetailPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";

import FooterMobile from "./components/FooterMobile";

import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import OrdersPage from "./Pages/OrdersPage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import Checkout from "./components/Checkout";

import CartPage from "./Pages/CartPage";

function Root() {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ContextProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <div>{showMobile ? <FooterMobile /> : <Footer />}</div>
      </ContextProvider>
    </>
  );
}

export default function App() {
  const router = createHashRouter([
    {
      children: [
        { element: <LandingPage />, path: "/" },
        { element: <ProductPage />, path: "/productpage" },
        { element: <DetailPage />, path: "/detailpage/:title" },
        { element: <SignupPage />, path: "/signup" },
        { element: <LoginPage />, path: "/login" },
        { element: <OrdersPage />, path: "/orders" },
        { element: <ConfirmationPage />, path: "/confirmation" },
        { element: <Contact />, path: "/contact" },
        { element: <About />, path: "/about" },
        { element: <FAQ />, path: "/faq" },
        { element: <CartPage />, path: "/cart" },
        { element: <Checkout />, path: "/checkout" },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}
