import React from "react";
// import ProductCard from "./components/ProductCard";
import "./index.css";

import {
  HashRouter,
  BrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Outlet />
      {/* <ProductCard /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
