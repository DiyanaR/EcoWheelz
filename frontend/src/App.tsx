import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

// import TestPage from "./pages/TestPage";
import { ContextProvider } from "./components/ContextProvider";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";


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
        // { element: <Product />, path: "/product" }

      ],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}
