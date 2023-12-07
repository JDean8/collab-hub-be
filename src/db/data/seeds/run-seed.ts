const testData = require("../test-data/index");
const { seed } = require("./seed");
const db = require("../../pool");

const runSeed = () => {
  console.log("Seeding...");
  return seed(testData).then(() => {
    console.log("Data seeded successfully");
    db.end();
  });
};

runSeed();
