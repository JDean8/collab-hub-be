import { Request, Response, NextFunction } from "express";
import { type Project } from "../../db/data/test-data/projects";
const { selectAllProjects, insertProject } = require("../models/ProjectModel");

exports.getAllProjects = (req: Request, res: Response, next: NextFunction) => {
  selectAllProjects()
    .then((data: Project[]) => {
      res.status(200).send({ projects: data });
    })
    .catch((err: Error) => next(err));
};

exports.postProject = (req: Request, res: Response, next: NextFunction) => {
  const { project } = req.body;
  insertProject(project)
    .then((project: Project) => {
      res.status(201).send({ project });
    })
    .catch((err: Error) => next(err));
};
