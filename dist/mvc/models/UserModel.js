"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../db/pool");
exports.selectAllUsers = () => {
    return db.query("SELECT * FROM users").then((users) => {
        console.log(users);
    });
};
