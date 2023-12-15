const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");
const { describe } = require("node:test");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/skills", () => {
  test("200: responds with an array of skill objects", () => {
    return request(app)
      .get("/api/skills")
      .expect(200)
      .then(({ body: { skills } }) => {
        expect(skills).toHaveLength(6);
        skills.forEach((skill) => {
          expect(skill).toEqual(
            expect.objectContaining({
              skill_id: expect.any(Number),
              skill_name: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/users/:user_id/skills", () => {
  test("200: responds with an array of user skills objects", () => {
    return request(app)
      .get("/api/users/1/skills")
      .expect(200)
      .then(({ body: { skills } }) => {
        expect(skills).toHaveLength(3);
      });
  });

  test("200: responds with an empty array if user doesn't have any skills yet", () => {
    return request(app)
      .get("/api/users/4/skills")
      .expect(200)
      .then(({ body: { skills } }) => {
        expect(skills).toHaveLength(0);
      });
  });

  test("404: responds with a message when passed a non-existent user_id", () => {
    return request(app)
      .get("/api/users/100/skills")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("No user found with that ID");
      });
  });
});

describe("POST /api/users/:user_id/skills", () => {
  test("201: responds with the posted user skills object", () => {
    return request(app)
      .post("/api/users/1/skills")
      .send({ skill_id: 5 })
      .expect(201)
      .then(({ body: { skill } }) => {
        expect(skill).toEqual(
          expect.objectContaining({
            user_id: 1,
            skill_id: 5,
          })
        );
      });
  });

  test("201: responds with posted user skills object when passed extra keys", () => {
    return request(app)
      .post("/api/users/1/skills")
      .send({ skill_id: 6, extra: "extra" })
      .expect(201)
      .then(({ body: { skill } }) => {
        expect(skill).toEqual(
          expect.objectContaining({
            user_id: 1,
            skill_id: 6,
          })
        );
      });
  });

  test("400: responds with bad request when passed a skill_id that has already been added", () => {
    return request(app)
      .post("/api/users/1/skills")
      .send({ skill_id: 1 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("You already added this skill");
      });
  });

  test("404: responds with a message when passed a non-existent skill_id", () => {
    return request(app)
      .post("/api/users/1/skills")
      .send({ skill_id: 100 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Skill not found");
      });
  });

  test("404: responds with a message when passed a non-existent user_id", () => {
    return request(app)
      .post("/api/users/100/skills")
      .send({ skill_id: 5 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("No user found with that ID");
      });
  });
});
