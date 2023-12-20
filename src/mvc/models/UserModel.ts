const db = require("../../../dist/db/pool.js");
const bcrypt = require("bcrypt");
import { type User } from "../../db/data/test-data/users";

type UserProps = {
  rows: User[];
};

exports.selectAllUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }: UserProps) => {
    return rows;
  });
};

exports.selectUserByID = (userID: string) => {
  return db
    .query(
      `
  SELECT * FROM users
  WHERE user_id = $1`,
      [userID]
    )
    .then(({ rows }: UserProps) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No user found with that ID",
        });
      }
      return rows[0];
    });
};

exports.removeUser = (userID: string) => {
  return db.query(
    `
    DELETE FROM users
    WHERE user_id = $1`,
    [userID]
  );
};

exports.editUser = (user: User, userID: string) => {
  if (
    !user.username ||
    !user.email ||
    !user.password ||
    !user.name ||
    !user.bio ||
    !user.avatar_url
  ) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "UPDATE users SET username = $1, email = $2, password = $3, name = $4, bio = $5, avatar_url = $6 WHERE user_id = $7 RETURNING *",
      [
        user.username,
        user.email,
        user.password,
        user.name,
        user.bio,
        user.avatar_url,
        userID,
      ]
    )
    .then(({ rows }: any) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows[0];
    });
};

exports.insertUser = (user: User) => {
  if (
    !user.email ||
    !user.password ||
    !user.avatar_url ||
    !user.name ||
    !user.username ||
    !user.bio
  ) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }
  return bcrypt
    .genSalt(10)
    .then((response: string) => {
      const hashedPassword = bcrypt.hash(user.password, response);
      return hashedPassword;
    })
    .then((hashedPassword: string) => {
      return db.query(
        `INSERT INTO users
    (user_id, username, avatar_url, email, name, bio, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
        [
          user.user_id,
          user.username,
          user.avatar_url,
          user.email,
          user.name,
          user.bio,
          hashedPassword,
        ]
      );
    })
    .then(({ rows }: UserProps) => {
      return rows[0];
    });
};
