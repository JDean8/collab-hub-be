const db = require("../../../dist/db/pool.js");
import { type Project } from "../../db/data/test-data/projects";
import { type Skill } from "../../db/data/test-data/skills";
import { type Status } from "../../db/data/test-data/status";
import { type Status_project } from "../../db/data/test-data/status-project";
import { type Project_skill } from "../../db/data/test-data/projects-skills";
const { fetchStatus } = require("./StatusModel");
const { fetchAllSkills } = require("./SkillsModel");

type ProjectProps = {
  rows: Project[];
};

type SkillProps = {
  rows: Skill[];
};

type StatusProps = {
  rows: Status[];
}

type StatusProjectProps = {
  rows: Status_project[];
}

type SkillsProjectProps = {
  rows: Project_skill[];
}

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

const selectSkillsByProjectId = (project_id: number) => {
  return db
  .query(`SELECT skills.skill_name, skills.skill_id FROM projects_skills LEFT JOIN skills ON projects_skills.skill_id = skills.skill_id WHERE project_id = $1`, [project_id])
  .then(({ rows }: SkillProps) => {
    return rows;
  })
}
module.exports.selectSkillsByProjectId = selectSkillsByProjectId;

exports.deleteProject = (project_id: number) => {
  return db
  .query("DELETE FROM projects WHERE project_id = $1", [project_id])
}

exports.fetchProjectStatus = (project_id: number) => {
  return db
  .query("SELECT status_name FROM status LEFT JOIN status_project ON status.status_id = status_project.status_id WHERE project_id = $1", [project_id])
  .then(({ rows }: StatusProps) => {
    return rows[0].status_name;
  })
}

exports.postProjectStatus = (project_id: number,  status : any) => {
  return fetchStatus()
  .then((statusObj: Status[]) => {
    let status_id = 0;
      statusObj.forEach((statusObj: Status) => {
      if(statusObj.status_name === status.status) {
         status_id = statusObj.status_id;
      }
    })
    return db
        .query("INSERT INTO status_project (status_id, project_id) VALUES ($1, $2) RETURNING *", [status_id, project_id])
  })
  .then(({ rows }: StatusProjectProps) => {
    return rows[0];
  })
}

exports.patchStatusById = (project_id: number, status: any) => {
  return fetchStatus()
  .then((statusObj: Status[]) => {
    let status_id;
    statusObj.forEach((statusObj: Status) => {
      if(statusObj.status_name === status.status) {
        status_id = statusObj.status_id;
      }
    })
    return status_id;
  })
  .then((status_id: any) => {
    if(status_id === undefined) return Promise.reject({status: 400, msg: "Bad request"})
    return db
    .query("UPDATE status_project SET status_id = $1 WHERE project_id = $2 RETURNING *", [status_id, project_id])
  })
  .then(({ rows }: StatusProjectProps) => {
    if(rows.length === 0) return Promise.reject({status: 404, msg: "Project not found"})
    return rows[0];
  })
}

exports.postSkills = (project_id: number, skills: any) => {
  return selectSkillsByProjectId(project_id)
  .then((skillsArr: Skill[]) => {
    let doesSkillExist = false;
    skillsArr.forEach((singleSkill: Skill) => {
      if(singleSkill.skill_name === skills.skill_name) 
      { 
        doesSkillExist = true;
      }
    })
    if(doesSkillExist) return Promise.reject({status: 400, msg: "Skill already exists"})
    })
  .then(() => {
    return fetchAllSkills()
  })
  .then((skillsObj: Skill[]) => {
    let skill_id;
    skillsObj.forEach((skillObj: Skill) => {
      if(skillObj.skill_name === skills.skill_name) {
        skill_id = skillObj.skill_id;
      }
    })
    return skill_id;
  })
  .then((skill_id: any) => {
   if(skill_id === undefined) return Promise.reject({status: 400, msg: "Bad request"})  
    return db
    .query("INSERT INTO projects_skills (project_id, skill_id) VALUES ($1, $2) RETURNING *", [project_id, skill_id])
  })
  .then(({ rows }: SkillsProjectProps) => {
    return rows[0];
  })
}

exports.deleteSkill = (skill_id: number, project_id: number) => {
  return db
  .query("DELETE FROM projects_skills WHERE skill_id = $1 AND project_id = $2", [skill_id, project_id])
}