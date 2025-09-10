// mongoose setup
const mongoose = require("mongoose");
const Laptop = require("./model/laptop");

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todoapp");

  // Sample laptop data
  const allDetails = [
    {
      brand: "Dell",
      model: "XPS 13",
      year: 2023,
      processor: "Intel Core i7-1260P",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      price: 1299,
      condition: "new",
      description: "Ultra-portable laptop with excellent display",
    },
    {
      brand: "Apple",
      model: "MacBook Air M2",
      year: 2022,
      processor: "Apple M2",
      ram: "8GB",
      storage: "256GB SSD",
      price: 1199,
      condition: "new",
      description: "Latest MacBook Air with M2 chip",
    },
    {
      brand: "HP",
      model: "Pavilion 15",
      year: 2021,
      processor: "AMD Ryzen 5 5500U",
      ram: "8GB DDR4",
      storage: "512GB SSD",
      price: 699,
      condition: "used",
      description: "Good condition, perfect for students",
    },
    {
      brand: "Lenovo",
      model: "ThinkPad X1 Carbon",
      year: 2023,
      processor: "Intel Core i7-1260P",
      ram: "16GB DDR4",
      storage: "1TB SSD",
      price: 1599,
      condition: "new",
      description: "Business laptop with excellent keyboard",
    },
    {
      brand: "ASUS",
      model: "ROG Strix G15",
      year: 2022,
      processor: "AMD Ryzen 7 6800H",
      ram: "16GB DDR5",
      storage: "1TB SSD",
      price: 1399,
      condition: "new",
      description: "Gaming laptop with RTX 3060",
    },
  ];

  // Clear existing data and insert new data
  try {
    await Laptop.deleteMany({});
    console.log("Cleared existing data");

    await Laptop.insertMany(allDetails);
    console.log("Data inserted successfully");
  } catch (error) {
    console.log("Error inserting data:", error);
  }

  mongoose.connection.close();
}
