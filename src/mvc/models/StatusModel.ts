import { type Status } from "../../db/data/test-data/status";
const db = require("../../../dist/db/pool.js");

type StatusProps = {
  rows: Status[];
};

exports.fetchStatus = () => {
  return db.query("SELECT * FROM status").then(({ rows }: StatusProps) => {
    return rows;
  });
};
