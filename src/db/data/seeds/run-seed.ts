const devData = require("../dev-data/index");
const { seed } = require("./seed");
const db = require("../../pool");

const runSeed = () => {
  console.log("Seeding...");
  return seed(devData).then(() => {
    console.log("Data seeded successfully");
    db.end();
  });
};

runSeed();
