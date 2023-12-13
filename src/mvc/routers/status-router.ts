export const statusRouter = require("express").Router();
const { getStatus } = require("../controllers/StatusController");

statusRouter.route("/").get(getStatus);
