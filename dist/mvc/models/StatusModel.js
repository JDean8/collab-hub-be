"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchStatus = () => {
    return db.query("SELECT * FROM status")
        .then(({ rows }) => {
        return rows;
    });
};
