"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const endPoints = require("../../../endpoints.json");
exports.getAllEndpoints = (req, res, next) => {
    res.status(200).send({ endPoints: endPoints });
};
