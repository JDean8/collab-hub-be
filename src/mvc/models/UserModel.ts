const db = require("../../../dist/db/pool.js");
const bcrypt = require("bcrypt");
import { type User } from "../../db/data/test-data/users";
import { type Project } from "../../db/data/test-data/projects";

type UserProps = {
  rows: User[];
};

type ProjectProps = {
  rows: Project[];
}

exports.selectAllUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }: UserProps) => {
    return rows;
  });
};

exports.selectUserByID = (userID: string) => {
  return db
    .query(
      `
  SELECT * FROM users
  WHERE user_id = $1`,
      [userID]
    )
    .then(({ rows }: UserProps) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No user found with that ID",
        });
      }
      return rows[0];
    });
};

exports.selectUserByEmail = (email: string) => {
  return db
    .query(
      `
  SELECT * FROM users
  WHERE email = $1`,
      [email]
    )
    .then(({ rows }: UserProps) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No user found with that Email",
        });
      }
      return rows[0];
    });
};

exports.removeUser = (userID: string) => {
  return db.query(
    `
    DELETE FROM users
    WHERE user_id = $1`,
    [userID]
  );
};

exports.editUser = (user: User, userID: string) => {
  if (
    !user.username ||
    !user.email ||
    !user.password ||
    !user.name ||
    !user.bio ||
    !user.avatar_url
  ) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      "UPDATE users SET username = $1, email = $2, password = $3, name = $4, bio = $5, avatar_url = $6 WHERE user_id = $7 RETURNING *",
      [
        user.username,
        user.email,
        user.password,
        user.name,
        user.bio,
        user.avatar_url,
        userID,
      ]
    )
    .then(({ rows }: any) => {
      if (!rows.length)
        return Promise.reject({ status: 404, msg: "User not found" });
      return rows[0];
    });
};

exports.insertUser = (user: User) => {
  if (
    !user.email ||
    !user.password ||
    !user.avatar_url ||
    !user.name ||
    !user.username ||
    !user.bio || 
    !user.github_url
  ) {
    return Promise.reject({
      status: 400,
      msg: "Bad request",
    });
  }
  return bcrypt
    .genSalt(10)
    .then((response: string) => {
      const hashedPassword = bcrypt.hash(user.password, response);
      return hashedPassword;
    })
    .then((hashedPassword: string) => {
      return db.query(
        `INSERT INTO users
    (username, avatar_url, email, name, bio, password, github_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
        [
          user.username,
          user.avatar_url,
          user.email,
          user.name,
          user.bio,
          hashedPassword,
          user.github_url,
        ]
      );
    })
    .then(({ rows }: UserProps) => {
      return rows[0];
    });
};

exports.getUserProjectsById = (user_id: number) => {
  return db.query(`SELECT * FROM projects WHERE project_author = $1`, [user_id])
  .then(({ rows }: ProjectProps) => {
    return rows;
  })
}

exports.fetchUserProjectsByMember = (user_id: number) => {
  return db.query(`SELECT * FROM projects_members JOIN projects ON projects.project_id = projects_members.project_id WHERE member_id = $1`, [user_id])
  .then(({ rows }: ProjectProps) => {
    return rows;
  })
}

exports.fetchUserRequests = (user_id: number) => {
  return db.query(`SELECT * FROM projects JOIN member_request ON projects.project_id = member_request.project_id WHERE user_id = $1`, [user_id])
  .then(({ rows }: ProjectProps) => {
    return rows;
  })
}