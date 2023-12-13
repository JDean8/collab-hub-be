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
    })
    test("404: responds with a message when passed a non-existent route", () => {
        return request(app)
            .get("/api/skill")
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("URL not found");
            });
    });
})