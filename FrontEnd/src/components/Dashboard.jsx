import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLaptops } from "../../api/laptop";

const Dashboard = () => {
  const navigate = useNavigate();

  // Fetch laptops data for dashboard stats
  const { data: laptops = [], isLoading } = useQuery({
    queryKey: ["laptops"],
    queryFn: getLaptops,
  });

  // Calculate statistics
  const totalLaptops = laptops.length;
  const newLaptops = laptops.filter(
    (laptop) => laptop.condition === "new"
  ).length;
  const usedLaptops = laptops.filter(
    (laptop) => laptop.condition === "used"
  ).length;
  const totalValue = laptops.reduce(
    (sum, laptop) => sum + (laptop.price || 0),
    0
  );
  const averagePrice = totalLaptops > 0 ? totalValue / totalLaptops : 0;

  // Get recent laptops (latest 3)
  const recentLaptops = laptops
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/signin");
  };
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Laptop Inventory</h1>
        <p className="text-lg text-blue-100">
          Manage your {totalLaptops} laptops with ease
        </p>
        <div className="mt-4 flex items-center space-x-6">
          <div className="text-sm">
            <span className="font-semibold">Total Value:</span> $
            {totalValue.toLocaleString()}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Average Price:</span> $
            {averagePrice.toLocaleString()}
          </div>
        </div>
      </div>
      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      )}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Laptops
              </h3>
              <p className="text-3xl font-bold text-blue-600">{totalLaptops}</p>
              <p className="text-sm text-gray-500">Active inventory</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                New Condition
              </h3>
              <p className="text-3xl font-bold text-green-600">{newLaptops}</p>
              <p className="text-sm text-gray-500">Brand new laptops</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Used Condition
              </h3>
              <p className="text-3xl font-bold text-yellow-600">
                {usedLaptops}
              </p>
              <p className="text-sm text-gray-500">Pre-owned laptops</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition duration-300">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Value
              </h3>
              <p className="text-3xl font-bold text-purple-600">
                ${totalValue.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Inventory worth</p>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/dashboard/add-laptop")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 font-medium text-lg shadow-lg transform hover:scale-105"
            >
              <span className="mr-2">➕</span>
              Add New Laptop
            </button>
            <button
              onClick={() => navigate("/dashboard/laptops")}
              className="w-full border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition duration-200 font-medium text-lg"
            >
              <span className="mr-2">📋</span>
              View All Laptops
            </button>
          </div>
        </div>{" "}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recent Laptops
          </h3>
          <div className="space-y-4">
            {recentLaptops.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💻</div>
                <p className="text-gray-500">No laptops yet</p>
                <button
                  onClick={() => navigate("/dashboard/add-laptop")}
                  className="mt-3 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Add your first laptop
                </button>
              </div>
            ) : (
              recentLaptops.map((laptop, index) => (
                <div
                  key={laptop._id}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      💻
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-900 text-base">
                      {laptop.brand} {laptop.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${laptop.price?.toLocaleString()} • {laptop.condition}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        laptop.condition === "new"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {laptop.condition}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>{" "}
      {/* Brand Distribution & Summary Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Brand Distribution
          </h3>
          <div className="space-y-4">
            {(() => {
              const brandCounts = laptops.reduce((acc, laptop) => {
                acc[laptop.brand] = (acc[laptop.brand] || 0) + 1;
                return acc;
              }, {});

              const brands = Object.entries(brandCounts).sort(
                ([, a], [, b]) => b - a
              );

              return brands.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No data available
                </div>
              ) : (
                brands.map(([brand, count]) => {
                  const percentage =
                    totalLaptops > 0 ? (count / totalLaptops) * 100 : 0;
                  return (
                    <div
                      key={brand}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                        <span className="font-medium">{brand}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-12 text-right">
                          {count} ({percentage.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  );
                })
              );
            })()}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Price Distribution
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {totalLaptops}
              </div>
              <div className="text-sm font-medium text-blue-800">
                Total Items
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {newLaptops}
              </div>
              <div className="text-sm font-medium text-green-800">
                New Condition
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {usedLaptops}
              </div>
              <div className="text-sm font-medium text-yellow-800">
                Used Condition
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                ${averagePrice.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-purple-800">
                Avg Price
              </div>
            </div>
          </div>

          {/* Price Range Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Most Expensive:</span>
                <div className="font-semibold">
                  $
                  {Math.max(
                    ...laptops.map((l) => l.price || 0)
                  ).toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Most Affordable:</span>
                <div className="font-semibold">
                  $
                  {laptops.length > 0
                    ? Math.min(
                        ...laptops.map((l) => l.price || 0)
                      ).toLocaleString()
                    : "0"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
