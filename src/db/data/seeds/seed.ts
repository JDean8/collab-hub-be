import { Chat } from "../test-data/chat";
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
import { ChatMembers } from "../test-data/chat-members";
import { ChatMessage } from "../test-data/chat-messages";

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
  statusProjectData: {
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
  chatData: {
    chat: Chat[]
  };
  chatMembersData: {
    chatMembers: ChatMembers[]
  };
  chatMessagesData: {
    chatMessages: ChatMessage[]
  };
};

export const seed = ({
  usersData,
  skillsData,
  usersSkillsData,
  statusData,
  projectsData,
  projectsSkillsData,
  statusProjectData,
  projectsMembersData,
  memberRequestsData,
  connectionsData,
  connectionRequestsData,
  chatData,
  chatMembersData,
  chatMessagesData
}: Data) => {
  return db
    .query(`DROP TABLE IF EXISTS users_skills CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS chat_messages CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS chat_members CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS chat CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS member_request;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS connections;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS connection_request;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS projects_skills CASCADE;");
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS status_project;`);
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS status;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS projects_members;");
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS projects CASCADE;`);
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS skills;");
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            bio VARCHAR(500) NOT NULL,
            avatar_url VARCHAR(255) NOT NULL,
            github_url VARCHAR(255) NOT NULL
        );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE skills 
    (skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(255) NOT NULL,
    skill_avatar VARCHAR(500) NOT NULL);`);
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
          project_description VARCHAR(750) NOT NULL,
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
      return db.query(`CREATE TABLE status_project
          (project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
          status_id INT REFERENCES status(status_id) ON DELETE CASCADE);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE projects_members
          (project_id INT REFERENCES projects(project_id) ON DELETE CASCADE,
          member_id INT REFERENCES users(user_id) ON DELETE CASCADE);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE member_request
          (user_id INT REFERENCES users(user_id) ON DELETE CASCADE,project_id INT REFERENCES projects(project_id) ON DELETE CASCADE);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE connections
          (user_id_a INT REFERENCES users(user_id) ON DELETE CASCADE,
          user_id_b INT REFERENCES users(user_id) ON DELETE CASCADE);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE connection_request
          (user_id_a INT REFERENCES users(user_id) ON DELETE CASCADE,
          user_id_b INT REFERENCES users(user_id) ON DELETE CASCADE);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE chat
      (chat_id VARCHAR(50) UNIQUE NOT NULL);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE chat_members
      (chat_id VARCHAR(50) REFERENCES chat(chat_id) ON DELETE CASCADE,
      user_id INT REFERENCES users(user_id) ON DELETE CASCADE);`);
    })
    .then(() => {
      return db.query(`CREATE TABLE chat_messages
      (message_id SERIAL PRIMARY KEY,
      chat_id VARCHAR(50) REFERENCES chat(chat_id) ON DELETE CASCADE,
      user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
      message VARCHAR(500) NOT NULL,
      avatar_url VARCHAR(500) NOT NULL,
      created_at TIMESTAMP NOT NULL);`);
    })
    .then(() => {
      const formattedSkills = format(
        `INSERT INTO skills
      (skill_id, skill_name, skill_avatar)
      VALUES %L RETURNING *;`,
        skillsData.skills.map((skill: Skill) => {
          return [skill.skill_id, skill.skill_name, skill.skill_avatar];
        })
      );
      return db.query(formattedSkills);
    })
    .then(() => {
      const formattedUsers = format(
        `INSERT INTO users
            (username, email, password, name, bio, avatar_url, github_url)
            VALUES %L RETURNING *;`,
        usersData.users.map((user: User) => {
          return [
            user.username,
            user.email,
            user.password,
            user.name,
            user.bio,
            user.avatar_url,
            user.github_url,
          ];
        })
      );
      return db.query(formattedUsers);
    })
    .then(() => {
      const formattedUsersSkills = format(
        `INSERT INTO users_skills
      (user_id, skill_id)
      VALUES %L RETURNING *;`,
        usersSkillsData.users_skills.map((userSkill: User_skill) => {
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
        statusData.status.map((singleStatus: Status) => {
          return [singleStatus.status_id, singleStatus.status_name];
        })
      );
      return db.query(formattedStatusData);
    })
    .then(() => {
      const formattedProjectsData = format(
        `INSERT INTO projects
        (project_author, project_name, project_description, project_created_at, required_members)
        VALUES %L RETURNING *;`,
        projectsData.projects.map((project: Project) => {
          return [
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
        projectsSkillsData.projects_skills.map(
          (projectSkill: Project_skill) => {
            return [projectSkill.project_id, projectSkill.skill_id];
          }
        )
      );
      return db.query(formattedProjectsSkillsData);
    })
    .then(() => {
      const formattedStatusProjectsData = format(
        `INSERT INTO status_project
        (project_id, status_id)
        VALUES %L RETURNING *;`,
        statusProjectData.status_project.map(
          (statusProject: Status_project) => {
            return [statusProject.project_id, statusProject.status_id];
          }
        )
      );
      return db.query(formattedStatusProjectsData);
    })
    .then(() => {
      const formattedProjectMembersData = format(
        `INSERT INTO projects_members
        (project_id, member_id)
        VALUES %L RETURNING *;`,
        projectsMembersData.projects_members.map(
          (projectMember: Project_member) => {
            return [projectMember.project_id, projectMember.member_id];
          }
        )
      );
      return db.query(formattedProjectMembersData);
    })
    .then(() => {
      const formattedMemberRequestsData = format(
        `INSERT INTO member_request
        (user_id, project_id)
        VALUES %L RETURNING *;`,
        memberRequestsData.member_request.map(
          (memberRequest: Member_request) => {
            return [memberRequest.user_id, memberRequest.project_id];
          }
        )
      );
      return db.query(formattedMemberRequestsData);
    })
    .then(() => {
      const formattedConnectionsData = format(
        `INSERT INTO connections
        (user_id_a, user_id_b)
        VALUES %L RETURNING *;`,
        connectionsData.connections.map((connection: Connections) => {
          return [connection.user_id_a, connection.user_id_b];
        })
      );
      return db.query(formattedConnectionsData);
    })
    .then(() => {
      const formattedConnectionRequestsData = format(
        `INSERT INTO connection_request
        (user_id_a, user_id_b)
        VALUES %L RETURNING *;`,
        connectionRequestsData.connection_request.map(
          (connectionRequest: Connection_request) => {
            return [connectionRequest.user_id_a, connectionRequest.user_id_b];
          }
        )
      );
      return db.query(formattedConnectionRequestsData);
    })
    .then(() => {
      const formattedChatData = format(
        `INSERT INTO chat
        (chat_id)
        VALUES %L RETURNING *;`,
        chatData.chat.map((chat: Chat) => {
          return [chat.chat_id];
        })
      );
        return db.query(formattedChatData);
    })
    .then(() => {
      const formattedChatMembersData = format(
        `INSERT INTO chat_members
        (chat_id, user_id)
        VALUES %L RETURNING *;`,
        chatMembersData.chatMembers.map((chatMember: ChatMembers) => {
          return [chatMember.chat_id, chatMember.user_id];
        })
      )
      return db.query(formattedChatMembersData)
    })
    .then(() => {
      const formattedChatMessagesData = format(
        `INSERT INTO chat_messages
        (chat_id, user_id, message, avatar_url, created_at)
        VALUES %L RETURNING *;`,
        chatMessagesData.chatMessages.map((chatMessage: ChatMessage) => {
          return [chatMessage.chat_id, chatMessage.sender_id, chatMessage.message, chatMessage.avatar_url, chatMessage.created_at]
        })
      )
      return db.query(formattedChatMessagesData)
    })
};
