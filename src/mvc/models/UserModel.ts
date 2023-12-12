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
