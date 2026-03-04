import { Navigate } from "react-router";
import { type ReactNode } from "react";

// ignote type
function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
