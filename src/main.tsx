 import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";

// 🔹 Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main App component
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  // </StrictMode>
);
