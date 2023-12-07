"use strict";
const testData = require('../data/test-data/index');
const { seed } = require('./seed');
const db = require('../connection');
const runSeed = () => {
    console.log('Seeding...');
    return seed(testData)
        .then(() => {
        console.log('Data seeded successfully');
        db.end();
    });
};
runSeed();
