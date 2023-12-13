"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.selectAllProjects = () => {
    return db.query("SELECT * FROM projects").then(({ rows }) => {
        return rows;
    });
};
