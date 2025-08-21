// src/routes/owner/dashboard.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/owner/dashboard")({
  beforeLoad: async () => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("adminRole");
    if (!token || role !== "owner") {
      throw redirect({ to: "/owner/login" });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  return <h1>Admin Dashboard</h1>;
}
