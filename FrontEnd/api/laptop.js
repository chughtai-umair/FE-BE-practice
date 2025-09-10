import api from "./axios";

// ✅ GET all laptops
export const getLaptops = async () => {
  const res = await api.get("/data");
  return res.data;
};

// ✅ GET one laptop by ID
export const getLaptopById = async (id) => {
  const res = await api.get(`/data/${id}`);
  return res.data;
};

// ✅ POST add new laptop
export const addLaptop = async (laptop) => {
  const res = await api.post("/add-laptop", laptop);
  return res.data;
};

// ✅ PUT update laptop
export const updateLaptop = async ({ id, ...updateData }) => {
  const res = await api.put(`/update-laptop/${id}`, updateData);
  return res.data;
};

// ✅ DELETE laptop
export const deleteLaptop = async (id) => {
  const res = await api.delete(`/delete-laptop/${id}`);
  return res.data;
};
