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

describe("GET /api/chat/members/:chat_id", () => {
    test("200: responds with the requested chat object", () => {
        return request(app)
            .get("/api/chat/members/1")
            .expect(200)
            .then(({ body }) => {
                expect(body.members).toEqual([{ chat_id: "1", user_id: 1}, { chat_id: "1", user_id: 3}]);
            });
    })
    test("404: responds with an error message when the chat_id is not found", () => {
        return request(app)
            .get("/api/chat/members/4")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Chat not found");
            });
    })
})

describe("GET /api/chat/messages/:chat_id", () => {
    test("200: responds with an array of all messages in the requested chat", () => {
        return request(app)
            .get("/api/chat/messages/1")
            .expect(200)
            .then(({ body }) => {
                expect(body.messages).toHaveLength(2);
                expect(body.messages).toEqual(
                    [ 
                        { chat_id: "1", message_id: 1, user_id: 1, message: "Hello", avatar_url: "https://i.imgur.com/1C22Hym.png",
                        created_at: "2024-01-30T12:30:42.000Z" },
                        { chat_id: "1", message_id: 2, user_id: 3, message: "Hi", created_at: "2024-01-30T12:32:42.000Z", avatar_url: "https://i.imgur.com/1C22Hym.png"}
                ]
                );
            });
    })
    test("404: responds with an error message when the chat_id is not found", () => {
        return request(app)
            .get("/api/chat/messages/4")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Chat not found");
            });
    })
    test("200: responds with an empty array when the chat_id is found but there are no messages", () => {
        return request(app)
            .get("/api/chat/messages/3")
            .expect(200)
            .then(({ body }) => {
                expect(body.messages).toEqual([]);
            });
    })
})

describe("POST /api/chat/messages/:chat_id", () => {
    test("201: responds with the posted message object", () => {
        return request(app)
            .post("/api/chat/messages/1")
            .send({ message: "Hello, how are you doing?", user_id: 1, avatar_url: "https://i.imgur.com/1C22Hym.png" })
            .expect(201)
            .then(({ body }) => {
                expect(body.message).toEqual({ chat_id: "1", message_id: 3, user_id: 1, message: "Hello, how are you doing?", avatar_url: "https://i.imgur.com/1C22Hym.png", created_at: expect.any(String) });
            });
    })
    test("201: responds with the posted message object when passed extra keys", () => {
        return request(app)
            .post("/api/chat/messages/1")
            .send({ message: "Hello, how are you doing?", user_id: 1, avatar_url: "https://i.imgur.com/1C22Hym.png", extra: "extra" })
            .expect(201)
            .then(({ body }) => {
                expect(body.message).toEqual({ chat_id: "1", message_id: 3, user_id: 1, message: "Hello, how are you doing?", avatar_url: "https://i.imgur.com/1C22Hym.png", created_at: expect.any(String) });
            });
    })
    test("400: responds with an error message when the message is missing", () => {
        return request(app)
            .post("/api/chat/messages/1")
            .send({ user_id: 1, avatar_url: "https://i.imgur.com/1C22Hym.png" })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
})

describe("POST /api/chat/members/:chat_id", () => {
    test("201: responds with the posted member object", () => {
        return request(app)
            .post("/api/chat/members/1")
            .send({ user_id: 2 })
            .expect(201)
            .then(({ body }) => {
                expect(body.member).toEqual({ chat_id: "1", user_id: 2 });
            });
    })
    test("201: responds with the posted member object when passed extra keys", () => {
        return request(app)
            .post("/api/chat/members/1")
            .send({ user_id: 2, extra: "extra" })
            .expect(201)
            .then(({ body }) => {
                expect(body.member).toEqual({ chat_id: "1", user_id: 2 });
            });
    })
    test("400: responds with an error message when the user_id is missing", () => {
        return request(app)
            .post("/api/chat/members/1")
            .send({})
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("Bad request");
            });
    })
    test("404: responds with an error message when the chat_id is not found", () => {
        return request(app)
            .post("/api/chat/members/4")
            .send({ user_id: 2 })
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("Chat not found");
            });
    })
    test("400: responds with an error message when user is already a member of the chat", () => {
        return request(app)
            .post("/api/chat/members/1")
            .send({ user_id: 1 })
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe("User already in chat");
            });
    })
})