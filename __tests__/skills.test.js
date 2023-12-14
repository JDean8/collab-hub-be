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

  // test("404: responds with a message when passed a non-existent user_id", () => {
  //   return request(app)
  //     .get("/api/users/100/skills")
  //     .expect(404)
  //     .then(({ body: { msg } }) => {
  //       expect(msg).toBe("User not found");
  //     });
  // });
});
