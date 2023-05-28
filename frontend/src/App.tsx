import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

// import TestPage from "./pages/TestPage";
import { ContextProvider } from "./components/ContextProvider";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ProductPage from "./Pages/ProductPage";
import DetailPage from "./Pages/DetailPage";
import FooterMobile from "./components/FooterMobile";
// import CartPage from "./Pages/CartPage";

function Root() {
  return (
    <>
      <ContextProvider>
        <Navbar />
        <Outlet />

        <Footer />
        <FooterMobile />
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
        // { element: <CartPage />, path: "/cart" },
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}
