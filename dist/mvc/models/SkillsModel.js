"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../../../dist/db/pool.js");
exports.fetchAllSkills = () => {
    return db.query("SELECT * FROM skills").then(({ rows }) => {
        return rows;
    });
};
exports.fetchUserSkills = (user_id) => {
    return db
        .query(`SELECT skills.skill_name, skills.skill_id FROM skills
    LEFT JOIN users_skills ON skills.skill_id = users_skills.skill_id
    WHERE users_skills.user_id = $1;`, [user_id])
        .then(({ rows }) => {
        return rows;
    });
};
exports.createUserSkill = (userId, skill) => {
    return db
        .query("SELECT * FROM skills")
        .then(({ rows }) => {
        const mappedSkills = rows.map((skill) => {
            return skill.skill_id;
        });
        if (!mappedSkills.includes(skill.skill_id)) {
            return Promise.reject({ status: 404, msg: "Skill not found" });
        }
        return db.query(`SELECT skills.skill_name, skills.skill_id FROM skills
      LEFT JOIN users_skills ON skills.skill_id = users_skills.skill_id
      WHERE users_skills.user_id = $1;`, [userId]);
    })
        .then(({ rows }) => {
        const mappedUserSkills = rows.map((skill) => {
            return skill.skill_id;
        });
        if (mappedUserSkills.includes(skill.skill_id)) {
            return Promise.reject({
                status: 400,
                msg: "You already added this skill",
            });
        }
        return db.query(`INSERT INTO users_skills (user_id, skill_id) VALUES ($1, $2) RETURNING *;`, [userId, skill.skill_id]);
    })
        .then(({ rows }) => {
        return rows[0];
    });
};
