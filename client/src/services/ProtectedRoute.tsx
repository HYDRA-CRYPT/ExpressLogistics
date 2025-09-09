import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

const ProtectedRoute = () => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");
  const user = useAuthStore((state) => state.user);
  const restoreSession = useAuthStore((state) => state.restoreSession);

  // Try to restore session if we have token but no user in store
  useEffect(() => {
    if (token && role === "admin" && !user) {
      console.log("🔄 ProtectedRoute: Restoring session from localStorage");
      restoreSession();
    }
  }, [token, role, user, restoreSession]);

  if (!token || role !== "admin") {
    // if no token, redirect to login
    return <Navigate to="/owner/login" replace />;
  }

  return <Outlet />; // render children routes
};

export default ProtectedRoute;
