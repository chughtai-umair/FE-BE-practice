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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
