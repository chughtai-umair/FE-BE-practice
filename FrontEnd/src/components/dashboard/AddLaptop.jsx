import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLaptop } from "../../../api/laptop";

const AddLaptop = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    processor: "",
    ram: "",
    storage: "",
    price: "",
    condition: "new",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // React Query Mutation for POST
  const mutation = useMutation({
    mutationFn: addLaptop,
    onSuccess: () => {
      queryClient.invalidateQueries(["laptops"]); // refresh list after add
      navigate("/dashboard/laptops");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    mutation.mutate(
      {
        ...formData,
        price: parseFloat(formData.price),
      },
      {
        onError: (err) => console.log("Error:", err),
        onSuccess: (res) => console.log("Success:", res),
      }
    );
  };
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-700 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Add New Laptop
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand (e.g., Dell, HP, Apple)"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Model (e.g., Inspiron 15)"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year (e.g., 2023)"
              required
              min="2000"
              max="2025"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price ($)"
              required
              min="0"
              step="0.01"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <input
            type="text"
            name="processor"
            value={formData.processor}
            onChange={handleChange}
            placeholder="Processor (e.g., Intel Core i7-12700H)"
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="ram"
              value={formData.ram}
              onChange={handleChange}
              placeholder="RAM (e.g., 16GB DDR4)"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              placeholder="Storage (e.g., 512GB SSD)"
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            rows="4"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
            >
              {mutation.isLoading ? "Adding..." : "Add Laptop"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/laptops")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
            >
              Cancel
            </button>
          </div>

          {mutation.isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              Error: {mutation.error?.message || "Failed to add laptop"}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddLaptop;
