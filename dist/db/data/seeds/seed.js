"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const db = require("../../pool");
const format = require("pg-format");
const seed = ({ usersData, skillsData, usersSkillsData }) => {
    return db.query(`DROP TABLE IF EXISTS users_skills CASCADE;`)
        .then(() => {
        return db
            .query(`DROP TABLE IF EXISTS users CASCADE;`)
            .then(() => {
            return db
                .query('DROP TABLE IF EXISTS skills;');
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
    skill_name VARCHAR(255) NOT NULL)`);
        })
            .then(() => {
            return db.query(`CREATE TABLE users_skills
    (user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(skill_id) ON DELETE CASCADE)`);
        })
            .then(() => {
            const formattedSkills = format(`INSERT INTO skills
      (skill_id, skill_name)
      VALUES %L RETURNING *;`, skillsData.skills.map((skill) => {
                return [skill.skill_id, skill.skill_name];
            }));
            return db.query(formattedSkills);
        })
            .then(() => {
            const formattedUsers = format(`INSERT INTO users
            (username, email, password, name, bio, avatar_url)
            VALUES %L RETURNING *;`, usersData.users.map((user) => {
                return [
                    user.username,
                    user.email,
                    user.password,
                    user.name,
                    user.bio,
                    user.avatar_url,
                ];
            }));
            return db.query(formattedUsers);
        });
    })
        .then(() => {
        const formattedUsersSkills = format(`INSERT INTO users_skills
      (user_id, skill_id)
      VALUES %L RETURNING *;`, usersSkillsData.users_skills.map((userSkill) => {
            return [userSkill.user_id, userSkill.skill_id];
        }));
        return db.query(formattedUsersSkills);
    });
};
exports.seed = seed;
