// express setup
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const Laptop = require("./model/laptop");
const { connectToDB } = require("./initDb");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// MIDDLEWARE to parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// fetch only one laptop by ID
app.get("/data/:id", async (req, res) => {
  const laptopId = req.params.id;
  try {
    const laptop = await Laptop.findById(laptopId);
    if (!laptop) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    res.json(laptop);
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ error: "Database connection error", details: error.message });
  }
});

// fetch all laptop data
app.get("/data", async (req, res) => {
  try {
    let laptops = await Laptop.find();
    console.log("Found laptops:", laptops.length);
    console.log("Laptops data:", laptops);
    res.json(laptops);
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .json({ error: "Database connection error", details: error.message });
  }
});

// create a new laptop entry
app.post("/add-laptop", async (req, res) => {
  const {
    brand,
    model,
    year,
    processor,
    ram,
    storage,
    price,
    condition,
    description,
  } = req.body;

  const newLaptop = new Laptop({
    brand,
    model,
    year,
    processor,
    ram,
    storage,
    price,
    condition,
    description,
  });

  try {
    await newLaptop.save();
    res.status(201).json({ message: "Laptop added successfully" });
  } catch (error) {
    console.error("Error adding laptop:", error);
    res.status(500).json({ error: "Failed to add laptop" });
  }
});

// update a laptop entry
app.put("/update-laptop/:id", async (req, res) => {
  const laptopId = req.params.id;
  const updateData = req.body;
  try {
    const updatedLaptop = await Laptop.findByIdAndUpdate(laptopId, updateData, {
      new: true,
    });
    if (!updatedLaptop) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    res.json({ message: "Laptop updated successfully", laptop: updatedLaptop });
  } catch (error) {
    console.error("Error updating laptop:", error);
    res.status(500).json({ error: "Failed to update laptop" });
  }
});

// delete a laptop entry
app.delete("/delete-laptop/:id", async (req, res) => {
  const laptopId = req.params.id;
  try {
    const deletedLaptop = await Laptop.findByIdAndDelete(laptopId);
    if (!deletedLaptop) {
      return res.status(404).json({ error: "Laptop not found" });
    }
    res.json({ message: "Laptop deleted successfully" });
  } catch (error) {
    console.error("Error deleting laptop:", error);
    res.status(500).json({ error: "Failed to delete laptop" });
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
