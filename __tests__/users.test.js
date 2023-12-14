const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users", () => {
  test("200: responds with an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(3);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              user_id: expect.any(Number),
              username: expect.any(String),
              avatar_url: expect.any(String),
              email: expect.any(String),
              name: expect.any(String),
              bio: expect.any(String),
              password: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/users/:user_id", () => {
  test("200: responds with one user object", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          user_id: 1,
          username: "tickle122",
          email: "user1@mail.com",
          password: "password",
          name: "Tom Tickle",
          bio: "I love cats and JavaScript!",
          avatar_url:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        });
      });
  });
});

describe("DELETE /api/users/:user_id", () => {
  test("204: responds with no content", () => {
    return request(app).delete("/api/users/1").expect(204);
  });
});

describe("Error handling", () => {
  test("404: responds with a message when passed a non-existent route", () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("URL not found");
      });
  });
});

describe("POST /api/users", () => {
  test("201: should respond with posted user object", () => {
    return request(app)
      .post("/api/users")
      .send({
        user: {
          user_id: 29,
          username: "BigLad13",
          avatar_url:
            "https://previews.123rf.com/images/ratoca/ratoca1203/ratoca120300226/12748273-funny-cartoon-face.jpg",
          email: "biglad13@gmail.com",
          name: "James",
          bio: "I like trains",
          password: "password1",
        },
      })
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user).toEqual(
          expect.objectContaining({
            user_id: expect.any(Number),
            username: expect.any(String),
            avatar_url: expect.any(String),
            email: expect.any(String),
            name: expect.any(String),
            bio: expect.any(String),
            password: expect.any(String),
          })
        );
      });
  });
  test("400: returns error message when passed invalid user object", () => {
    return request(app)
      .post("/api/users")
      .send({
        user: {
          user_id: 29,
          username: "BigLad13",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});
