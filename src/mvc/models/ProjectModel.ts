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
};

type StatusProjectProps = {
  rows: Status_project[];
};

type SkillsProjectProps = {
  rows: Project_skill[];
};

type ProjectMembersProps = {
  rows: {
    user_id: number;
    username: string;
  }[];
};

type MembersRequestProps = {
  rows: {
    project_id: number;
    user_id: number;
  }[];
};

type InsertedProject = {
  project_id: number;
  project_author: number;
  project_name: string;
  project_description: string;
  project_created_at: number;
  required_members: number
}

exports.selectAllProjects = () => {
  return db.query("SELECT * FROM projects ORDER BY project_created_at DESC").then(({ rows }: ProjectProps) => {
    return rows;
  });
};

exports.insertProject = (project: Project) => {
  let newProject: InsertedProject = {
    project_id: 0,
    project_author: 0,
    project_name: "",
    project_description: "",
    project_created_at: 0,
    required_members: 0
  }
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
  } 
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
      newProject = {
        project_id: rows[0].project_id,
        project_author: rows[0].project_author,
        project_name: rows[0].project_name,
        project_description: rows[0].project_description,
        required_members: rows[0].required_members,
        project_created_at: rows[0].project_created_at,
      };
      return newProject;
    })
    .then(() => {
      return db.query(
        `INSERT INTO projects_members (project_id, member_id) VALUES ($1, $2) RETURNING *`,
        [newProject.project_id, project.project_author]
      );
    })
    .then(() => {
      return newProject;
    });
};

exports.selectProjectById = (project_id: number) => {
  return db
    .query("SELECT * FROM projects WHERE project_id = $1", [project_id])
    .then(({ rows }: ProjectProps) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "Project not found" });
      return rows[0];
    });
};

exports.updateProjectById = (project_id: number, project: any) => {
  return db
    .query(
      "UPDATE projects SET project_name = $1, project_description = $2, required_members = $3 WHERE project_id = $4 RETURNING *",
      [
        project.project_name,
        project.project_description,
        project.required_members,
        project_id,
      ]
    )
    .then(({ rows }: ProjectProps) => {
      return rows[0];
    });
};

const selectSkillsByProjectId = (project_id: number) => {
  return db
    .query(
      `SELECT skills.skill_name, skills.skill_id, skills.skill_avatar FROM projects_skills LEFT JOIN skills ON projects_skills.skill_id = skills.skill_id WHERE project_id = $1`,
      [project_id]
    )
    .then(({ rows }: SkillProps) => {
      return rows;
    });
};
module.exports.selectSkillsByProjectId = selectSkillsByProjectId;

exports.deleteProject = (project_id: number) => {
  return db.query("DELETE FROM projects WHERE project_id = $1", [project_id]);
};

exports.fetchProjectStatus = (project_id: number) => {
  return db
    .query(
      "SELECT status_name FROM status LEFT JOIN status_project ON status.status_id = status_project.status_id WHERE project_id = $1",
      [project_id]
    )
    .then(({ rows }: StatusProps) => {
      return rows[0].status_name;
    });
};

exports.postProjectStatus = (project_id: number, status: any) => {
  return fetchStatus()
    .then((statusObj: Status[]) => {
      let status_id = 0;
      statusObj.forEach((statusObj: Status) => {
        if (statusObj.status_name === status.status) {
          status_id = statusObj.status_id;
        }
      });
      return db.query(
        "INSERT INTO status_project (status_id, project_id) VALUES ($1, $2) RETURNING *",
        [status_id, project_id]
      );
    })
    .then(({ rows }: StatusProjectProps) => {
      return rows[0];
    });
};

exports.patchStatusById = (project_id: number, status: any) => {
  return fetchStatus()
    .then((statusObj: Status[]) => {
      let status_id;
      statusObj.forEach((statusObj: Status) => {
        if (statusObj.status_name === status.status) {
          status_id = statusObj.status_id;
        }
      });
      return status_id;
    })
    .then((status_id: any) => {
      if (status_id === undefined)
        return Promise.reject({ status: 400, msg: "Bad request" });
      return db.query(
        "UPDATE status_project SET status_id = $1 WHERE project_id = $2 RETURNING *",
        [status_id, project_id]
      );
    })
    .then(({ rows }: StatusProjectProps) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "Project not found" });
      return rows[0];
    });
};

exports.postSkills = (project_id: number, skills: any) => {
  return selectSkillsByProjectId(project_id)
    .then((skillsArr: Skill[]) => {
      let doesSkillExist = false;
      skillsArr.forEach((singleSkill: Skill) => {
        if (singleSkill.skill_name === skills.skill_name) {
          doesSkillExist = true;
        }
      });
      if (doesSkillExist)
        return Promise.reject({ status: 400, msg: "Skill already exists" });
    })
    .then(() => {
      return fetchAllSkills();
    })
    .then((skillsObj: Skill[]) => {
      let skill_id;
      skillsObj.forEach((skillObj: Skill) => {
        if (skillObj.skill_name === skills.skill_name) {
          skill_id = skillObj.skill_id;
        }
      });
      return skill_id;
    })
    .then((skill_id: any) => {
      if (skill_id === undefined)
        return Promise.reject({ status: 400, msg: "Bad request" });
      return db.query(
        "INSERT INTO projects_skills (project_id, skill_id) VALUES ($1, $2) RETURNING *",
        [project_id, skill_id]
      );
    })
    .then(({ rows }: SkillsProjectProps) => {
      return rows[0];
    });
};

exports.deleteSkill = (skill_id: number, project_id: number) => {
  return db.query(
    "DELETE FROM projects_skills WHERE skill_id = $1 AND project_id = $2",
    [skill_id, project_id]
  );
};

exports.fetchProjectMembers = (project_id: number) => {
  return db
    .query(
      "SELECT users.user_id, users.username FROM projects_members LEFT JOIN users ON projects_members.member_id = users.user_id WHERE project_id = $1",
      [project_id]
    )
    .then(({ rows }: ProjectMembersProps) => {
      return rows;
    });
};

exports.fetchMemberRequests = (project_id: number) => {
  return db
    .query(
      "SELECT users.user_id, users.username FROM member_request LEFT JOIN users ON member_request.user_id = users.user_id WHERE project_id = $1",
      [project_id]
    )
    .then(({ rows }: ProjectMembersProps) => {
      return rows;
    });
};

exports.postMemberRequest = (project_id: number, user_id: any) => {
  return db
    .query(
      "INSERT INTO member_request (user_id, project_id) VALUES ($1, $2) RETURNING *",
      [user_id.user_id, project_id]
    )
    .then(({ rows }: MembersRequestProps) => {
      return rows[0];
    });
};

exports.deleteMemberRequest = (project_id: number, user_id: number) => {
  return db.query(
    "DELETE FROM member_request WHERE project_id = $1 AND user_id = $2",
    [project_id, user_id]
  );
};

exports.deleteMember = (project_id: number, user_id: number) => {
  return db.query(
    "DELETE FROM projects_members WHERE project_id = $1 AND member_id = $2",
    [project_id, user_id]
  );
};

exports.postMember = (project_id: number, member: any) => {
  return db
    .query(
      "DELETE FROM member_request WHERE project_id = $1 AND user_id = $2",
      [project_id, member.user_id]
    )
    .then(() => {
      if (member.decision === "rejected") {
        return Promise.reject({
          status: 200,
          msg: `Member request rejected. Feedback: ${member.feedback}`,
        });
      }
    })
    .then(() => {
      return db.query(
        "INSERT INTO projects_members (project_id, member_id) VALUES ($1, $2) RETURNING *",
        [project_id, member.user_id]
      );
    })
    .then(({ rows }: any) => {
      return rows;
    });
};

exports.getUserProjectsById = (user_id: number) => {
  console.log("in model")
}