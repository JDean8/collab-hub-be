import { Request, Response, NextFunction } from "express";

type CustomErrorContent = {
  msg: string;
  status: number;
};

type PSQLErrorContent = {
  code: string;
};

exports.handleCustomErrors = (
  err: CustomErrorContent,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handlePSQLErrors = (
  err: PSQLErrorContent,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const psqlBadRequestCodes = ["22P02", "42703", "23502", "23503"];
  if (psqlBadRequestCodes.includes(err.code)) {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
};
