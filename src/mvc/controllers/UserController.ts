import { Request, Response, NextFunction } from "express";
import { type User } from "../../db/data/test-data/users";
const { selectAllUsers } = require("../models/UserModel");

exports.getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  selectAllUsers()
    .then((data: User[]) => {
      res.status(200).send({ users: data });
    })
    .catch((err: Error) => next(err));
};
