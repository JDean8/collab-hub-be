import { Request, Response, NextFunction } from "express";
const endPoints = require("../../../endpoints.json");

exports.getAllEndpoints = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ endPoints: endPoints });
};
