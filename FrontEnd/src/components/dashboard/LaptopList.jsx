import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLaptops, deleteLaptop, updateLaptop } from "../../../api/laptop";
import { useState } from "react";

const LaptopList = () => {
  const queryClient = useQueryClient();
  const [editingLaptop, setEditingLaptop] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  // Fetch all laptops
  const { data: laptops = [], isLoading } = useQuery({
    queryKey: ["laptops"],
    queryFn: getLaptops,
  });

  // Delete laptop mutation
  const deleteMutation = useMutation({
    mutationFn: deleteLaptop,
    onSuccess: () => {
      queryClient.invalidateQueries(["laptops"]);
    },
  });

  // Update laptop mutation
  const updateMutation = useMutation({
    mutationFn: updateLaptop,
    onSuccess: () => {
      queryClient.invalidateQueries(["laptops"]);
      setEditingLaptop(null);
    },
  });

  const handleEdit = (laptop) => {
    setEditingLaptop(laptop);
    setEditFormData(laptop);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      id: editingLaptop._id,
      ...editFormData,
      price: parseFloat(editFormData.price),
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  if (isLoading) return <p>Loading laptops...</p>;

  return (
    <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Laptop Inventory</h2>
        <p className="text-gray-300 mt-1">Manage your laptop collection</p>
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
                <tr key={laptop._id} className="hover:bg-gray-50">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(laptop)}
                      className="text-blue-600 hover:text-blue-900 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(laptop._id)}
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

      {/* Edit Modal */}
      {editingLaptop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Edit Laptop</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="brand"
                  value={editFormData.brand}
                  onChange={handleEditChange}
                  placeholder="Brand"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="model"
                  value={editFormData.model}
                  onChange={handleEditChange}
                  placeholder="Model"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  name="year"
                  value={editFormData.year}
                  onChange={handleEditChange}
                  placeholder="Year"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="processor"
                  value={editFormData.processor}
                  onChange={handleEditChange}
                  placeholder="Processor"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="ram"
                  value={editFormData.ram}
                  onChange={handleEditChange}
                  placeholder="RAM"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="storage"
                  value={editFormData.storage}
                  onChange={handleEditChange}
                  placeholder="Storage"
                  className="border rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={editFormData.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  className="border rounded px-3 py-2"
                  required
                />
                <select
                  name="condition"
                  value={editFormData.condition}
                  onChange={handleEditChange}
                  className="border rounded px-3 py-2"
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </select>
              </div>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="w-full border rounded px-3 py-2"
                rows="3"
              />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={updateMutation.isLoading}
                >
                  {updateMutation.isLoading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingLaptop(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaptopList;
