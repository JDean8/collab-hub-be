const db = require("../db/connection.ts");

db.query("SELECT * FROM users").then((result) => {
  console.log(result.rows);
});
