import { Connection_request } from "../data/test-data/connection-request";
import { Connections } from "../data/test-data/connections";
import { Member_request } from "../data/test-data/member-requests";
import { Project } from "../data/test-data/projects";
import { Project_member } from "../data/test-data/projects-members";
import { Project_skill } from "../data/test-data/projects-skills";
import { Skill } from "../data/test-data/skills";
import { Status } from "../data/test-data/status";
import { Status_project } from "../data/test-data/status-project";
import { User } from "../data/test-data/users";
import { User_skill } from "../data/test-data/users-skills";

const db = require("../connection.ts");
const format = require("pg-format")

type Data = {
    usersData: {
        users: User[]
    },
    usersSkillsData: {
        usersSkills: User_skill[]
    },
    skillsData: {
        skills: Skill[]
    },
    statusData: {
        status: Status[]
    },
    projectsData: {
        projects: Project[]
    },
    projectsSkillsData: {
        projects_skills: Project_skill[]
    },
    projectsMembersData: {
        projects_members: Project_member[]
    },
    statusProjectsData: {
        status_project: Status_project[]
    },
    connectionsData: {
        connections: Connections[]
    },
    connectionRequestsData: {
        connection_request: Connection_request[]
    },
    memberRequestsData: {
        member_request: Member_request[]
    }
}


export const seed = ( { usersData} : Data) => {
   
    return db.query(`DROP TABLE IF EXISTS users CASCADE;`)
    .then(() => {
        return db.query(`CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            bio VARCHAR(500) NOT NULL,
            avatar_url VARCHAR(255) NOT NULL
        );`)
    })
    .then(() => {
        const formattedUsers = format(
            `INSERT INTO users
            (username, email, password, name, bio, avatar_url)
            VALUES %L RETURNING *;`,
            usersData.users.map((user: any) => {
                return [user.username, user.email, user.password, user.name, user.bio, user.avatar_url];
            })
        )
        return db.query(formattedUsers);
    })
}
