import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout flex h-screen w-full bg-gray-100">
        {/* Placeholder for Sidebar */}
        <aside className="w-64 bg-gray-900 text-white p-4">
            <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
            <nav>
                <ul>
                    <li className="mb-2"><a href="/admin/dashboard" className="hover:text-gray-300">Dashboard</a></li>
                </ul>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
            <Outlet />
        </main>
    </div>
  );
};

export default AdminLayout;
