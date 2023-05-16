import Navbar from "./Components/Navbar";
import TestPage from "./Pages/TestPage";
import { Outlet, RouterProvider, createHashRouter } from "react-router-dom";

function Root() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />

      {/* <Footer /> */}
    </div>
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
