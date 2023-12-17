import { Request, Response, NextFunction } from "express";
const {
  fetchAllSkills,
  fetchUserSkills,
  createUserSkill,
} = require("../models/SkillsModel");
import { Skill } from "../../db/data/test-data/skills";

exports.getAllSkills = (req: Request, res: Response, next: NextFunction) => {
  fetchAllSkills()
    .then((data: Skill[]) => {
      res.status(200).send({ skills: data });
    })
    .catch((err: Error) => next(err));
};

exports.getUserSkills = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;
  fetchUserSkills(user_id)
    .then((data: Skill[]) => {
      res.status(200).send({ skills: data });
    })
    .catch((err: Error) => next(err));
};

exports.postUserSkill = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;

  createUserSkill(user_id, req.body)
    .then((skill: Skill) => {
      res.status(201).send({ skill });
    })
    .catch((err: Error) => next(err));
};
