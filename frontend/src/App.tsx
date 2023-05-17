import Navbar from "./components/Navbar";
<<<<<<< HEAD
import TestPage from "./pages/TestPage";
import { ContextProvider } from "./components/ContextProvider";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import Footer from "./components/Footer";
=======
import Footer from "./components/Footer";

// import TestPage from "./pages/TestPage";
import { ContextProvider } from "./components/ContextProvider";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
>>>>>>> 5e52419 (LandingPage, bild)

function Root() {
  return (
    <>
      <ContextProvider>
        <Navbar />
        <Outlet />
<<<<<<< HEAD
=======
        {/* <LandingPage/> */}
        {/* <Route exact path="/" component={LandingPage} /> */}

>>>>>>> 5e52419 (LandingPage, bild)
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
