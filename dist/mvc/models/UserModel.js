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
exports.insertUser = (user) => {
    return db
        .query(`INSERT INTO users
  (user_id, username, avatar_url, email, name, bio, password)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [
        user.user_id,
        user.username,
        user.avatar_url,
        user.email,
        user.name,
        user.bio,
        user.password,
    ])
        .then(({ rows }) => {
        console.log(rows);
        return rows[0];
    });
};
