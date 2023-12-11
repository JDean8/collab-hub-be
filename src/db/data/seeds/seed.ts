import { Connection_request } from "../test-data/connection-request";
import { Connections } from "../test-data/connections";
import { Member_request } from "../test-data/member-requests";
import { Project } from "../test-data/projects";
import { Project_member } from "../test-data/projects-members";
import { Project_skill } from "../test-data/projects-skills";
import { Skill } from "../test-data/skills";
import { Status } from "../test-data/status";
import { Status_project } from "../test-data/status-project";
import { User } from "../test-data/users";
import { User_skill } from "../test-data/users-skills";

const db = require("../../pool");
const format = require("pg-format");

type Data = {
  usersData: {
    users: User[];
  };
  usersSkillsData: {
    users_skills: User_skill[];
  };
  skillsData: {
    skills: Skill[];
  };
  statusData: {
    status: Status[];
  };
  projectsData: {
    projects: Project[];
  };
  projectsSkillsData: {
    projects_skills: Project_skill[];
  };
  projectsMembersData: {
    projects_members: Project_member[];
  };
  statusProjectsData: {
    status_project: Status_project[];
  };
  connectionsData: {
    connections: Connections[];
  };
  connectionRequestsData: {
    connection_request: Connection_request[];
  };
  memberRequestsData: {
    member_request: Member_request[];
  };
};

export const seed = ({
  usersData,
  skillsData,
  usersSkillsData,
  statusData,
  projectsData,
  projectsSkillsData,
}: Data) => {
  return db
    .query(`DROP TABLE IF EXISTS users_skills CASCADE;`)
    .then(() => {
      return db
        .query(`DROP TABLE IF EXISTS users CASCADE;`)
        .then(() => {
          return db.query("DROP TABLE IF EXISTS skills;");
        })
        .then(() => {
          return db.query("DROP TABLE IF EXISTS status;");
        })
        .then(() => {
          return db.query("DROP TABLE IF EXISTS projects;");
        })
        .then(() => {
          return db.query("DROP TABLE IF EXISTS projects_skills;");
        })
        .then(() => {
          return db.query(`CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            bio VARCHAR(500) NOT NULL,
            avatar_url VARCHAR(255) NOT NULL
        );`);
        })
        .then(() => {
          return db.query(`CREATE TABLE skills 
    (skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(255) NOT NULL);`);
        })
        .then(() => {
          return db.query(`CREATE TABLE users_skills
    (user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(skill_id) ON DELETE CASCADE);`);
        })
        .then(() => {
          return db.query(`CREATE TABLE status
          (status_id SERIAL PRIMARY KEY,
            status_name VARCHAR(255) NOT NULL);`);
        })
        .then(() => {
          return db.query(`CREATE TABLE projects
          (project_id SERIAL PRIMARY KEY,
          project_author INT REFERENCES users(user_id) ON DELETE CASCADE,
          project_name VARCHAR(255) NOT NULL,
          project_description VARCHAR(500) NOT NULL,
          project_created_at BIGINT,
          required_members INT);`);
        })
        .then(() => {
          return db.query(`
          CREATE TABLE projects_skills
          (project_id INT REFERENCES projects(project_id) ON DELETE CASCADE, 
          skill_id INT REFERENCES skills(skill_id) ON DELETE CASCADE)`);
        })
        .then(() => {
          const formattedSkills = format(
            `INSERT INTO skills
      (skill_id, skill_name)
      VALUES %L RETURNING *;`,

            skillsData.skills.map((skill: any) => {
              return [skill.skill_id, skill.skill_name];
            })
          );

          return db.query(formattedSkills);
        })
        .then(() => {
          const formattedUsers = format(
            `INSERT INTO users
            (username, email, password, name, bio, avatar_url)
            VALUES %L RETURNING *;`,
            usersData.users.map((user: any) => {
              return [
                user.username,
                user.email,
                user.password,
                user.name,
                user.bio,
                user.avatar_url,
              ];
            })
          );
          return db.query(formattedUsers);
        });
    })
    .then(() => {
      const formattedUsersSkills = format(
        `INSERT INTO users_skills
      (user_id, skill_id)
      VALUES %L RETURNING *;`,
        usersSkillsData.users_skills.map((userSkill: any) => {
          return [userSkill.user_id, userSkill.skill_id];
        })
      );
      return db.query(formattedUsersSkills);
    })
    .then(() => {
      const formattedStatusData = format(
        `INSERT INTO status
        (status_id, status_name)
        VALUES %L RETURNING *;`,
        statusData.status.map((singleStatus: any) => {
          return [singleStatus.status_id, singleStatus.status_name];
        })
      );
      return db.query(formattedStatusData);
    })
    .then(() => {
      const formattedProjectsData = format(
        `INSERT INTO projects
        (project_id, project_author, project_name, project_description, project_created_at, required_members)
        VALUES %L RETURNING *;`,
        projectsData.projects.map((project: any) => {
          return [
            project.project_id,
            project.project_author,
            project.project_name,
            project.project_description,
            project.project_created_at,
            project.required_members,
          ];
        })
      );
      return db.query(formattedProjectsData);
    })
    .then(() => {
      const formattedProjectsSkillsData = format(
        `INSERT INTO projects_skills
        (project_id, skill_id)
        VALUES %L RETURNING *;`,
        projectsSkillsData.projects_skills.map((projectSkill: any) => {
          return [projectSkill.project_id, projectSkill.skill_id];
        })
      );
      return db.query(formattedProjectsSkillsData);
    });
};
