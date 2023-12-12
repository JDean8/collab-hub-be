"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.selectAllUsers = () => {
    return db.query("SELECT * FROM users").then(({ rows }) => {
        return rows;
    });
};
exports.selectUserByID = (userID) => {
    return db
        .query(`
  SELECT * FROM users
  WHERE user_id = $1`, [userID])
        .then(({ rows }) => {
        return rows[0];
    });
};
exports.removeUser = (userID) => {
    return db.query(`
    DELETE FROM users
    WHERE user_id = $1`, [userID]);
};
