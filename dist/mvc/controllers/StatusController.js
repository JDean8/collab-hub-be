"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchStatus } = require("../models/StatusModel");
exports.getStatus = (req, res, next) => {
    fetchStatus()
        .then((data) => {
        res.status(200).send({ status: data });
    })
        .catch((err) => next(err));
};
