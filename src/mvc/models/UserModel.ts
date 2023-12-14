const db = require("../../../dist/db/pool.js");
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

exports.insertUser = (user: User) => {
  return db
    .query(
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
        user.password,
      ]
    )
    .then(({ rows }: UserProps) => {
      return rows[0];
    });
};
