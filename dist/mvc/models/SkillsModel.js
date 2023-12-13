"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchAllSkills = () => {
    return db.query("SELECT * FROM skills").then(({ rows }) => {
        return rows;
    });
};
