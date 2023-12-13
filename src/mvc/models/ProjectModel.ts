const db = require("../../../dist/db/pool.js");
import { type Project } from "../../db/data/test-data/projects";

type ProjectProps = {
  rows: Project[];
};

exports.selectAllProjects = () => {
  return db.query("SELECT * FROM projects").then(({ rows }: ProjectProps) => {
    return rows;
  });
};
