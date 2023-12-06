"use strict";
const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "test";
require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});
module.exports = pool;
