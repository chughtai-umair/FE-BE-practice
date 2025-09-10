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
    { path: "/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/dashboard/laptops", icon: "💻", label: "All Laptops" },
    { path: "/dashboard/add-laptop", icon: "➕", label: "Add Laptop" },
  ];
  return (
    <div className="h-screen w-screen bg-gray-100 flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-sm`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isSidebarOpen && (
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Laptop Store
                </h2>
                <p className="text-gray-500 text-xs">Management System</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 p-1.5 rounded-md hover:bg-gray-100 transition duration-200"
            >
              {isSidebarOpen ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>{" "}
        {/* Navigation Items */}
        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="ml-3 font-medium text-sm">
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
