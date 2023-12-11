import { Request, Response, NextFunction } from "express";
const { selectAllUsers } = require("../models/UserModel");
import { User } from "../../db/data/test-data/users";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  selectAllUsers().then((res: User[]) => {
    console.log(res);
  });
};
