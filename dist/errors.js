"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    }
    else
        next(err);
};
exports.handlePSQLErrors = (err, req, res, next) => {
    const psqlBadRequestCodes = ["22P02", "42703", "23502", "23503"];
    if (psqlBadRequestCodes.includes(err.code)) {
        res.status(400).send({ msg: "Bad request" });
    }
    else
        next(err);
};
