"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// const { request: Req } = require("express");
// const { response: Res } = require("express");
var app = express();
var port = process.env.PORT || 3000;
app.get("/", function (req, res) {
    res.send("Hello, TypeScript Express!");
});
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
