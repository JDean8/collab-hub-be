const db = require("../../db/pool");
import { User } from "../../db/data/test-data/users";

exports.selectAllUsers = () => {
  return db.query("SELECT * FROM users").then((users: User[]) => {
    console.log(users);
  });
};
