// src/routes/owner/index.tsx
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/owner/")({
  component: () => (
    <div className="admin-layout">
      <h1>Admin Panel</h1>
      <Outlet />
    </div>
  ),
});
