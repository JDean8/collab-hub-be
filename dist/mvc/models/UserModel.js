"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
const bcrypt = require("bcrypt");
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
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "No user found with that ID",
            });
        }
        return rows[0];
    });
};
exports.selectUserByEmail = (email) => {
    return db
        .query(`
  SELECT * FROM users
  WHERE email = $1`, [email])
        .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "No user found with that Email",
            });
        }
        return rows[0];
    });
};
exports.removeUser = (userID) => {
    return db.query(`
    DELETE FROM users
    WHERE user_id = $1`, [userID]);
};
exports.editUser = (user, userID) => {
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
exports.insertUser = (user) => {
    if (!user.email ||
        !user.password ||
        !user.avatar_url ||
        !user.name ||
        !user.username ||
        !user.bio) {
        return Promise.reject({
            status: 400,
            msg: "Bad request",
        });
    }
    return bcrypt
        .genSalt(10)
        .then((response) => {
        const hashedPassword = bcrypt.hash(user.password, response);
        return hashedPassword;
    })
        .then((hashedPassword) => {
        return db.query(`INSERT INTO users
    (username, avatar_url, email, name, bio, password)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, [
            user.username,
            user.avatar_url,
            user.email,
            user.name,
            user.bio,
            hashedPassword,
        ]);
    })
        .then(({ rows }) => {
        return rows[0];
    });
};
exports.getUserProjectsById = (user_id) => {
    return db.query(`SELECT * FROM projects WHERE project_author = $1`, [user_id])
        .then(({ rows }) => {
        return rows;
    });
};
