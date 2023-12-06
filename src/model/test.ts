const db = require("../db/connection.ts");
import { queryResult } from 'pg-promise';

db.query("SELECT * FROM users").then((result: queryResult) => {
  console.log(result);
});
