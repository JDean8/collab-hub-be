const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");
const { describe } = require("node:test");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/status", () => {
    test("200: responds with an array of status objects", () => {
        return request(app)
            .get("/api/status")
            .expect(200)
            .then(({ body: { status } }) => {
                expect(status).toHaveLength(3);
                status.forEach((status) => {
                    expect(status).toEqual(
                        expect.objectContaining({
                            status_id: expect.any(Number),
                            status_name: expect.any(String),
                        })
                    );
                });
            });
    })
})