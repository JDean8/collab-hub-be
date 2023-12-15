import { Request, Response, NextFunction } from "express";
const {
  fetchAllSkills,
  fetchUserSkills,
  createUserSkill,
  removeUserSkill,
} = require("../models/SkillsModel");
const { selectUserByID } = require("../models/UserModel");
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

  selectUserByID(user_id)
    .then(() => {
      return fetchUserSkills(user_id);
    })
    .then((data: Skill[]) => {
      res.status(200).send({ skills: data });
    })
    .catch((err: Error) => next(err));
};

exports.postUserSkill = (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.params;

  selectUserByID(user_id)
    .then(() => {
      return createUserSkill(user_id, req.body);
    })
    .then((skill: Skill) => {
      res.status(201).send({ skill });
    })
    .catch((err: Error) => next(err));
};

exports.deleteUserSkill = (req: Request, res: Response, next: NextFunction) => {
  const { user_id, skill_id } = req.params;

  removeUserSkill(user_id, skill_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err: Error) => next(err));
};
