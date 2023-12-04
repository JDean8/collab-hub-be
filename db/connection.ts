const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "test";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

const connectDb = async () => {
  try {
    const pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });

    console.log(process.env.PGDATABASE);

    await pool.connect();
    const res = await pool.query("SELECT * FROM users");
    console.log(res);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

connectDb();
