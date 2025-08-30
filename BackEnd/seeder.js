const laptopModel = require("./model/laptop");
const allLaptops = require("./data/laptop");
const { connectToDB } = require("./initDb");

const seedData = () => {
  connectToDB();
  laptopModel
    .insertMany(allLaptops)
    .then(() => {
      console.log("Data seeded successfully");
      process.exit();
    })
    .catch((err) => {
      console.error("Error seeding data:", err);
      process.exit(1);
    });
};

if (process.argv.includes("--seed")) {
  seedData();
}
