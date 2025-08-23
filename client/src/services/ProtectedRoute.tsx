import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");

  if (!token || role !== "admin") {
    // if no token, redirect to login
    return <Navigate to="/owner/login" replace />;
  }

  return <Outlet />; // render children routes
};

export default ProtectedRoute;
