"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusRouter = void 0;
exports.statusRouter = require("express").Router();
const { getStatus } = require("../controllers/StatusController");
exports.statusRouter.route("/").get(getStatus);
