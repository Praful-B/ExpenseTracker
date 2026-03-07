import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoute from "./utils/ProtectedRoutes.tsx";

import "./index.css";
import App from "./App.tsx";
import Dashboard from "./features/Authentication/pages/Dashboard.tsx";
import UserRegistrationPage from "./features/Authentication/pages/UserRegisterationPage.tsx";
import UserLoginPage from "./features/Authentication/pages/UserLoginPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/register" element={<UserRegistrationPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
