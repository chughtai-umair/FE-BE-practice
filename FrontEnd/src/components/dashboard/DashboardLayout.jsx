import React, { useState } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/signin");
  };

  const sidebarItems = [
    { path: "/dashboard", icon: "📊", label: "Overview" },
    { path: "/dashboard/laptops", icon: "💻", label: "Laptops" },
    { path: "/dashboard/add-laptop", icon: "➕", label: "Add Laptop" },
  ];

  return (
    <div className="h-screen w-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-gradient-to-b from-slate-900 via-blue-900 to-indigo-900 transition-all duration-300 flex flex-col shadow-2xl`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div>
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <p className="text-blue-200 text-sm">Laptop Management</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition duration-200"
            >
              {isSidebarOpen ? "◀" : "▶"}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-3">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="ml-4 font-medium text-lg">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/20">
          {isSidebarOpen && (
            <div className="mb-4 p-4 bg-white/10 rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">U</span>
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium text-base">User</p>
                  <p className="text-blue-200 text-sm">Administrator</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-xl transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            {isSidebarOpen && (
              <span className="ml-3 font-medium text-base">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b h-20 flex items-center justify-between px-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Laptop Management System
            </h1>
            <p className="text-gray-600 text-base">
              Manage your inventory efficiently
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                Welcome back!
              </p>
              <p className="text-sm text-gray-600">Have a productive day</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
