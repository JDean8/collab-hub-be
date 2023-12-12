"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.selectAllUsers = () => {
    return db.query("SELECT * FROM users").then(({ rows }) => {
        return rows;
    });
};
