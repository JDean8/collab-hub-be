const { selectUserByID } = require("./UserModel");
import { type Skill } from "../../db/data/test-data/skills";
const db = require("../../../dist/db/pool.js");

type SkillsProps = {
  rows: Skill[];
};

type NewSkillProps = {
  skill_id: number;
};

exports.fetchAllSkills = () => {
  return db.query("SELECT * FROM skills").then(({ rows }: SkillsProps) => {
    return rows;
  });
};

exports.fetchUserSkills = (user_id: number) => {
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

exports.createUserSkill = (userId: number, skill: NewSkillProps) => {
  return db
    .query("SELECT * FROM skills")
    .then(({ rows }: SkillsProps) => {
      const mappedSkills = rows.map((skill: Skill) => {
        return skill.skill_id;
      });

      if (!mappedSkills.includes(skill.skill_id)) {
        return Promise.reject({ status: 404, msg: "Skill not found" });
      }

      return db.query(
        `SELECT skills.skill_name, skills.skill_id FROM skills
      LEFT JOIN users_skills ON skills.skill_id = users_skills.skill_id
      WHERE users_skills.user_id = $1;`,
        [userId]
      );
    })
    .then(({ rows }: SkillsProps) => {
      const mappedUserSkills = rows.map((skill: Skill) => {
        return skill.skill_id;
      });

      if (mappedUserSkills.includes(skill.skill_id)) {
        return Promise.reject({
          status: 400,
          msg: "You already added this skill",
        });
      }

      return db.query(
        `INSERT INTO users_skills (user_id, skill_id) VALUES ($1, $2) RETURNING *;`,
        [userId, skill.skill_id]
      );
    })
    .then(({ rows }: SkillsProps) => {
      return rows[0];
    });
};

exports.removeUserSkill = (user_id: number, skill_id: number) => {
  return selectUserByID(user_id)
    .then(() => {
      return db.query("SELECT * FROM skills");
    })
    .then(({ rows }: SkillsProps) => {
      const mappedSkills = rows.map((skill: Skill) => {
        return skill.skill_id;
      });

      if (!mappedSkills.includes(+skill_id)) {
        return Promise.reject({ status: 404, msg: "Skill not found" });
      }

      return db.query(
        `DELETE FROM users_skills WHERE user_id = $1 AND skill_id = $2;`,
        [user_id, skill_id]
      );
    });
};
