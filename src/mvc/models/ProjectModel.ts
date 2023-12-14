const db = require("../../../dist/db/pool.js");
import { type Project } from "../../db/data/test-data/projects";

type ProjectProps = {
  rows: Project[];
};

exports.selectAllProjects = () => {
  return db.query("SELECT * FROM projects").then(({ rows }: ProjectProps) => {
    return rows;
  });
};

exports.insertProject = (project: Project) => {
  if (
    !project.project_author ||
    !project.project_created_at ||
    !project.project_description ||
    !project.required_members ||
    !project.project_name
  ) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  } else {
    return db
      .query(
        "INSERT INTO projects (project_author, project_name, project_description, project_created_at, required_members) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          project.project_author,
          project.project_name,
          project.project_description,
          project.project_created_at,
          project.required_members,
        ]
      )
      .then(({ rows }: ProjectProps) => {
        return rows[0];
      });
  }
};
