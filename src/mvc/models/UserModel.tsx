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
