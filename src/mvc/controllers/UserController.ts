import { Request, Response, NextFunction } from "express";
import { User } from "../../db/data/test-data/users";
const {
  selectAllUsers,
  removeUser,
  selectUserByID,
  editUser,
  insertUser,
  selectUserByEmail,
} = require("../models/UserModel");

exports.getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  selectAllUsers()
    .then((data: User[]) => {
      res.status(200).send({ users: data });
    })
    .catch((err: Error) => next(err));
};

exports.getUserByID = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  selectUserByID(user_id)
    .then((data: User) => {
      res.status(200).send({ user: data });
    })
    .catch((err: Error) => next(err));
};

exports.getUserByEmail = (req: Request, res: Response, next: NextFunction) => {
  const { user_email } = req.params;
  selectUserByEmail(user_email)
    .then((data: User) => {
      res.status(200).send({ user: data });
    })
    .catch((err: Error) => next(err));
};

exports.deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  selectUserByID(user_id)
    .then(() => {
      return removeUser(user_id);
    })
    .then((data: User[]) => {
      res.sendStatus(204);
    })
    .catch((err: Error) => next(err));
};

exports.patchUser = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  const { user } = req.body;
  if (!user) {
    res.status(400).send({ msg: "Bad request" });
  }
  editUser(user, user_id)
    .then((user: User) => {
      res.status(200).send({ user: user });
    })
    .catch((err: Error) => {
      return next(err);
    });
};

exports.postUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  insertUser(user)
    .then((user: User) => {
      res.status(201).send({ user: user });
    })
    .catch((err: Error) => next(err));
};
