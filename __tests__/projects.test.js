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
              project_created_at: expect.any(Number),
              required_members: expect.any(Number),
            })
          );
        });
      });
  });
});
