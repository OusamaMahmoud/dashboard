import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router"; // Updated import
import Dashboard from "./components/Dashboard.tsx";
import Login from "./components/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx"; // For route protection

// Define Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ), // Protect the dashboard route
      },
    ],
  },
]);

// Render Application
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
