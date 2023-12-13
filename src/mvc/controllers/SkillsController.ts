import { Request, Response, NextFunction } from "express";
const { fetchAllSkills } = require("../models/SkillsModel");
import { Skill } from "../../db/data/test-data/skills";

exports.getAllSkills = (req: Request, res: Response, next: NextFunction) => {
  fetchAllSkills()
    .then((data: Skill[]) => {
      res.status(200).send({ skills: data });
    })
    .catch((err: Error) => next(err));
};
