import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import Auth from "./components/Auth";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Chats from "./components/Chats";
import Groups from "./components/Groups";
import Contacts from "./components/Contacts";
import Notifications from "./components/Notifications";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          { index: true, element: <Chats /> },
          { path: "groups", element: <Groups /> },
          { path: "contacts", element: <Contacts /> },
          { path: "notifications", element: <Notifications /> },
        ],
      },
      {
        path: "/auth/:name",
        element: <Auth />,
        children: [
          { path: "signin", element: <Signin /> },
          { path: "signup", element: <Signup /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
