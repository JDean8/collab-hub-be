var Pool = require("pg").Pool;
var ENV = process.env.NODE_ENV || "test";
require("dotenv").config({
    path: "".concat(__dirname, "/../.env.").concat(ENV),
});
var pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
module.exports = pool;
