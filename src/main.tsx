import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import Login from "./pages/login/Login";
import Screen from "./pages/Screens/Screen";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./RootPage";
import ScreenDetails from "./pages/Screens/ScreenDetails";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "screen",
        element: <Screen />,
      },
      {
        path: "screen/:slug", // <-- ✅ Dynamic route for screen details
        element: <ScreenDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


// Render to DOM
const root = createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
