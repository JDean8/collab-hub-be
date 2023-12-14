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
