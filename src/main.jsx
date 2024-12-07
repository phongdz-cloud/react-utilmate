import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <div>Login page</div>,
  },
  {
    path: "/register",
    element: <div>Register page</div>,
  },
  {
    path: "/user",
    element: <div>User page</div>,
  },
  {
    path: "/product",
    element: <div>Product page</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
