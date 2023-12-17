import { Request, Response, NextFunction } from "express";
import { type Project } from "../../db/data/test-data/projects";
import { type Skill } from "../../db/data/test-data/skills";
const { selectAllProjects, insertProject, selectProjectById, selectSkillsByProjectId, updateProjectById, deleteProject } = require("../models/ProjectModel");

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

exports.getProjectById = (req: Request, res: Response, next: NextFunction) => {
  selectProjectById(req.params.project_id)
  .then((project: Project) => {
    res.status(200).send({ project });
  })
  .catch((err: Error) => next(err));
}

exports.patchProjectById = (req: Request, res: Response, next: NextFunction) => {
  const { project } = req.body;
  if(project === undefined) return next({status: 400, msg: "Bad request"})
  return selectProjectById(req.params.project_id)
  .then(() => {
    return updateProjectById(req.params.project_id, project)
  })
  .then((project: Project) => {
    res.status(200).send({ project });
  })
  .catch((err: Error) => next(err));
}

exports.getSkillsByProjectId = (req: Request, res: Response, next: NextFunction) => {
  return selectProjectById(req.params.project_id)
  .then(() => { 
    return selectSkillsByProjectId(req.params.project_id) 
  })
  .then((skills: Skill[]) => {
    res.status(200).send({ skills });
  })
  .catch((err: Error) => next(err));
}

exports.deleteProjectById = (req: Request, res: Response, next: NextFunction) => {
  const { project_id } = req.params;
  deleteProject(project_id)
  .then(() => {
    res.sendStatus(204);
  })
  .catch((err: Error) => next(err));
}