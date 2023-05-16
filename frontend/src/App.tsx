import Navbar from "./Components/Navbar";
import TestPage from "./Pages/TestPage";
import { ContextProvider } from "./Components/ContextProvider";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";

function Root() {
  return (
    <>
      <ContextProvider>
        <Navbar />
        <Outlet />

        {/* <Footer /> */}
      </ContextProvider>
    </>
  );
}

export default function App() {
  const router = createHashRouter([
    {
      children: [{ element: <TestPage />, path: "/" }],
      element: <Root />,
    },
  ]);
  return <RouterProvider router={router} />;
}
