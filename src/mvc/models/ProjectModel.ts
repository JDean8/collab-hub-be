const db = require("../../../dist/db/pool.js");
import { type Project } from "../../db/data/test-data/projects";
import { type Skill } from "../../db/data/test-data/skills";

type ProjectProps = {
  rows: Project[];
};

type SkillProps = {
  rows: Skill[];
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

exports.selectProjectById = (project_id: number) => {
  return db
    .query("SELECT * FROM projects WHERE project_id = $1", [project_id])
    .then(({ rows }: ProjectProps) => {
      if(rows.length === 0) return Promise.reject({status: 404, msg: "Project not found"})
      return rows[0];
    });
};

exports.updateProjectById = (project_id: number, project: any) => {
  return db
  .query("UPDATE projects SET project_name = $1, project_description = $2, required_members = $3 WHERE project_id = $4 RETURNING *", [project.project_name, project.project_description, project.required_members, project_id])
  .then(({ rows }: ProjectProps) => {
    return rows[0];
  })
}

exports.selectSkillsByProjectId = (project_id: number) => {
  return db
  .query(`SELECT skills.skill_name FROM projects_skills LEFT JOIN skills ON projects_skills.skill_id = skills.skill_id WHERE project_id = $1`, [project_id])
  .then(({ rows }: SkillProps) => {
    return rows.map((row: Skill) => {
      return row.skill_name;
    })
  })
}

exports.deleteProject = (project_id: number) => {
  return db
  .query("DELETE FROM projects WHERE project_id = $1", [project_id])
}