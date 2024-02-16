"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        !user.bio ||
        !user.github_url) {
        return Promise.reject({
            status: 400,
            msg: "Bad request",
        });
    }
    return db
        .query("SELECT * FROM users")
        .then(({ rows }) => {
        const emailExists = rows.some((u) => u.email === user.email);
        const usernameExists = rows.some((u) => u.username === user.username);
        if (emailExists)
            return Promise.reject({ status: 400, msg: "email is already in use" });
        if (usernameExists)
            return Promise.reject({
                status: 400,
                msg: "username is already in use",
            });
        return bcrypt.genSalt(10).then((response) => {
            const hashedPassword = bcrypt.hash(user.password, response);
            return hashedPassword;
        });
    })
        .then((hashedPassword) => {
        return db.query(`INSERT INTO users
    (username, avatar_url, email, name, bio, password, github_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [
            user.username,
            user.avatar_url,
            user.email,
            user.name,
            user.bio,
            hashedPassword,
            user.github_url,
        ]);
    })
        .then(({ rows }) => {
        return rows[0];
    });
};
exports.getUserProjectsById = (user_id) => {
    return db
        .query(`SELECT * FROM projects WHERE project_author = $1`, [user_id])
        .then(({ rows }) => {
        return rows;
    });
};
exports.fetchUserProjectsByMember = (user_id) => {
    return db
        .query(`SELECT * FROM projects_members JOIN projects ON projects.project_id = projects_members.project_id WHERE member_id = $1`, [user_id])
        .then(({ rows }) => {
        return rows;
    });
};
exports.fetchUserRequests = (user_id) => {
    return db
        .query(`SELECT * FROM projects JOIN member_request ON projects.project_id = member_request.project_id WHERE user_id = $1`, [user_id])
        .then(({ rows }) => {
        return rows;
    });
};
exports.signInWithEmail = (password, email) => {
    return db
        .query(`
SELECT * FROM users
WHERE email = $1`, [email])
        .then(({ rows }) => __awaiter(void 0, void 0, void 0, function* () {
        if (rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: "No user found with that Email",
            });
        }
        const passwordMatch = yield bcrypt.compare(password, rows[0].password);
        if (!passwordMatch)
            return Promise.reject({
                status: 400,
                msg: "Password is incorrect!",
            });
        return rows[0];
    }));
};
