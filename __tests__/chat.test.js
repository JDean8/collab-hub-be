const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/chat", () => {
    test("200: responds with an array of chat objects", () => {
        return request(app)
            .get("/api/chat")
            .expect(200)
            .then(({ body }) => {
                expect(body.chats).toHaveLength(3);
                expect(body.chats).toEqual(
                    [ 
                        { chat_id: "1"},
                        { chat_id: "2"},
                        { chat_id: "3"}
                ]
                );
            });
    })
})

describe("POST /api/chat", () => {
    test("201: responds with the posted chat object", () => {
        return request(app)
            .post("/api/chat")
            .send({ chat_id: "4" })
            .expect(201)
            .then(({ body }) => {
                expect(body.chat).toEqual({ chat_id: "4" });
            });
    })
    test("201: responds with the posted chat object when passed extra keys", () => {
        return request(app)
            .post("/api/chat")
            .send({ chat_id: "4", extra: "extra" })
            .expect(201)
            .then(({ body }) => {
                expect(body.chat).toEqual({ chat_id: "4" });
            });
    
    })
    test(("400: responds with an error message when the chat_id is missing"), () => {
        return request(app)
            .post("/api/chat")
            .send({})
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
})

describe("GET /api/chat/members", () => {
    test("200: responds with an array of all chats member objects", () => {
        return request(app)
            .get("/api/chat/members")
            .expect(200)
            .then(({ body }) => {
                expect(body.members).toHaveLength(2);
                expect(body.members).toEqual(
                    [ 
                        { chat_id: "1", user_id: 1},
                        { chat_id: "1", user_id: 3}
                ]
                );
            });
    })
})