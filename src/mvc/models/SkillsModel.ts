import { type Skill } from "../../db/data/test-data/skills";
const db = require("../../../dist/db/pool.js");

type SkillsProps = {
  rows: Skill[];
};

exports.fetchAllSkills = () => {
  return db.query("SELECT * FROM skills").then(({ rows }: SkillsProps) => {
    return rows;
  });
};
