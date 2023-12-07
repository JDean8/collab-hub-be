"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const db = require("../connection.ts");
const format = require("pg-format");
const seed = ({ usersData }) => {
    return db.query(`DROP TABLE IF EXISTS users CASCADE;`)
        .then(() => {
        return db.query(`CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            bio VARCHAR(500) NOT NULL,
            avatar_url VARCHAR(255) NOT NULL
        );`);
    })
        .then(() => {
        const formattedUsers = format(`INSERT INTO users
            (username, email, password, name, bio, avatar_url)
            VALUES %L RETURNING *;`, usersData.users.map((user) => {
            return [user.username, user.email, user.password, user.name, user.bio, user.avatar_url];
        }));
        return db.query(formattedUsers);
    });
};
exports.seed = seed;
