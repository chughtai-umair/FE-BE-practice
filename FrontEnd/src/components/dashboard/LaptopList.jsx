import React, { useState, useEffect } from "react";

const LaptopList = () => {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    // Get laptops from localStorage
    const savedLaptops = localStorage.getItem("laptops");
    if (savedLaptops) {
      setLaptops(JSON.parse(savedLaptops));
    }
  }, []);

  const deleteLaptop = (id) => {
    const updatedLaptops = laptops.filter((laptop) => laptop.id !== id);
    setLaptops(updatedLaptops);
    localStorage.setItem("laptops", JSON.stringify(updatedLaptops));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Laptop Inventory</h2>
        <p className="text-gray-600 mt-1">Manage your laptop collection</p>
      </div>

      {laptops.length === 0 ? (
        <div className="p-12 text-center">
          <div className="text-6xl mb-4">💻</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Laptops Found
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by adding your first laptop to the inventory.
          </p>
          <a
            href="/dashboard/add-laptop"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium inline-block"
          >
            Add Your First Laptop
          </a>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand & Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {laptops.map((laptop) => (
                <tr key={laptop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {laptop.brand} {laptop.model}
                      </div>
                      <div className="text-sm text-gray-500">{laptop.year}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div>{laptop.processor}</div>
                      <div className="text-gray-500">
                        {laptop.ram} RAM • {laptop.storage} Storage
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${laptop.price?.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        laptop.condition === "new"
                          ? "bg-green-100 text-green-800"
                          : laptop.condition === "used"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {laptop.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteLaptop(laptop.id)}
                      className="text-red-600 hover:text-red-900 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LaptopList;
