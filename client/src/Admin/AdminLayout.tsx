import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
          <Link to="/owner/dashboard" className="block hover:text-green-400">
            Dashboard
          </Link>
          <Link to="/owner/orders" className="block hover:text-green-400">
            Orders
          </Link>
          <Link to="/owner/delivery" className="block hover:text-green-400">
            Drivers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
