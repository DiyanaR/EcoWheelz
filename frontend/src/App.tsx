import Navbar from "./Components/Navbar";
import TestPage from "./Pages/TestPage";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";

function Root() {
  return (
    <>
      <Navbar />
      <Outlet />

      {/* <Footer /> */}
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
