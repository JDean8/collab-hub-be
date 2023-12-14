import { type Skill } from "../../db/data/test-data/skills";
const db = require("../../../dist/db/pool.js");

type SkillsProps = {
  rows: Skill[];
};

type NewSkillProps = {
  skill_id: Number;
};

exports.fetchAllSkills = () => {
  return db.query("SELECT * FROM skills").then(({ rows }: SkillsProps) => {
    return rows;
  });
};

exports.fetchUserSkills = (user_id: Number) => {
  return db
    .query(
      `SELECT skills.skill_name, skills.skill_id FROM skills
    LEFT JOIN users_skills ON skills.skill_id = users_skills.skill_id
    WHERE users_skills.user_id = $1;`,
      [user_id]
    )
    .then(({ rows }: SkillsProps) => {
      return rows;
    });
};

exports.createUserSkill = (userId: Number, skill: NewSkillProps) => {
  return db
    .query(
      `INSERT INTO users_skills (user_id, skill_id) VALUES ($1, $2) RETURNING *;`,
      [userId, skill.skill_id]
    )
    .then(({ rows }: SkillsProps) => {
      return rows[0];
    });
};
