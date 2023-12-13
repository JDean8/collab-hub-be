import { Request, Response, NextFunction } from "express";
const { fetchStatus } = require("../models/StatusModel");
import { Status } from "../../db/data/test-data/status";

exports.getStatus = (req: Request, res: Response, next: NextFunction) => {
    fetchStatus()
    .then((data: Status[]) => {
        res.status(200).send({status: data})
    })
    .catch((err: Error) => next(err))
}