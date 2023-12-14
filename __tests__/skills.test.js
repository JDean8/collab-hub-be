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
});
