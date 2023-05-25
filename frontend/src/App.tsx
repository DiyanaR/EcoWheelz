import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ContextProvider } from "./components/ContextProvider";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import ProductPage from "./Pages/ProductPage";
import DetailPage from "./Pages/DetailPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";

function Root() {
  return (
    <>
      <ContextProvider>
        <Navbar />
        <Outlet />

        <Footer />
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
      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}
