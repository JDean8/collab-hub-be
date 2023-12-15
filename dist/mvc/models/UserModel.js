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
exports.editUser = (user, userID) => {
    console.log("hello");
    if (!user.username ||
        !user.email ||
        !user.password ||
        !user.name ||
        !user.bio ||
        !user.avatar_url) {
        return Promise.reject({ status: 400, msg: "Bad request" });
    }
    return db
        .query("UPDATE users SET username = $1, email = $2, password = $3, name = $4, bio = $5, avatar_url = $6 WHERE user_id = $7 RETURNING *", [
        user.username,
        user.email,
        user.password,
        user.name,
        user.bio,
        user.avatar_url,
        userID,
    ])
        .then(({ rows }) => {
        if (!rows.length)
            return Promise.reject({ status: 404, msg: "User not found" });
        return rows[0];
    });
};
