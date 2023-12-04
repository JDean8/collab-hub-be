var db = require("../db/connection.ts");
db.query("SELECT * FROM users").then(function (result) {
    console.log(result.rows);
});
