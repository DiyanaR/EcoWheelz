import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ContextProvider } from "./components/ContextProvider";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LandingPage from "./Pages/LandingPage";
import ProductPage from "./Pages/ProductPage";
import DetailPage from "./Pages/DetailPage";

import FooterMobile from "./components/FooterMobile";

import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";

// import CartPage from "./Pages/CartPage";

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
        <Outlet />
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
        // { element: <Product />, path: "/product" }
        // { element: <CartPage />, path: "/cart" },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}
