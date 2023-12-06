"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../db/connection.ts");
db.query("SELECT * FROM users").then((result) => {
    console.log(result);
});
