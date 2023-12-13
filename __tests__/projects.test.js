const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/projects", () => {
  test("200: responds with an array of projects", () => {
    return request(app)
      .get("/api/projects")
      .expect(200)
      .then(({ body: { projects } }) => {
        expect(projects).toHaveLength(6);
        projects.forEach((project) => {
          expect(project).toEqual(
            expect.objectContaining({
              project_id: expect.any(Number),
              project_author: expect.any(Number),
              project_name: expect.any(String),
              project_description: expect.any(String),
              project_created_at: expect.any(String),
              required_members: expect.any(Number),
            })
          );
        });
      });
  });
});

escribe("POST /api/projects", () => {
  test("201: responds with a project object", () => {
    return request(app)
      .post("/api/projects")
      .send({
        project: {
          project_author: 2,
          project_name: "Collab Hub",
          project_description: "Interesting project for finding team members",
          project_created_at: 1669852800000,
          required_members: 3,
        },
      })
      .expect(201)
      .then(({ body: { project } }) => {
        expect(project).toEqual(
          expect.objectContaining({
            project_id: expect.any(Number),
            project_author: expect.any(Number),
            project_name: expect.any(String),
            project_description: expect.any(String),
            project_created_at: expect.any(String),
            required_members: expect.any(Number),
          })
        );
      });
  });
});
