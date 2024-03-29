const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");
const { describe } = require("node:test");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/users", () => {
  test("200: responds with an array of user objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(5);
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
              github_url: expect.any(String),
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
          password:
            "$2b$10$08sjmFeFNNgdGhjq4Kig.OfDzLpXr/K.MoFI3ynd9EZlrbbOnVn5m",
          name: "Tom Tickle",
          bio: "I love cats and JavaScript!",
          avatar_url:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          github_url: "https://github.com",
        });
      });
  });
  test("404: responds with error message when user_id that does not exist", () => {
    return request(app)
      .get("/api/users/148")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("No user found with that ID");
      });
  });
  test("400: Bad reqeust, invalid type", () => {
    return request(app)
      .get("/api/users/SPACE")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Bad request");
      });
  });
});

describe("GET /api/users/signin/:user_email", () => {
  test("200: responds with one user object", () => {
    return request(app)
      .get("/api/users/signin/user1@mail.com")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toEqual({
          user_id: 1,
          username: "tickle122",
          email: "user1@mail.com",
          password:
            "$2b$10$08sjmFeFNNgdGhjq4Kig.OfDzLpXr/K.MoFI3ynd9EZlrbbOnVn5m",
          name: "Tom Tickle",
          bio: "I love cats and JavaScript!",
          avatar_url:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          github_url: "https://github.com",
        });
      });
  });
  test("404: responds with error message when email that does not exist", () => {
    return request(app)
      .get("/api/users/signin/user1232@mail.com")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("No user found with that Email");
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

describe("PATCH /api/users/:user_id", () => {
  test("200: responds with updated user when successful", () => {
    return request(app)
      .patch("/api/users/1")
      .send({
        user: {
          username: "AngryTom",
          email: "newEmail@mail.com",
          password: "password",
          name: "Thomas Tickle",
          bio: "I love cats and JavaScript!",
          avatar_url:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          github_url: "https://github.com",
        },
      })
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).toMatchObject({
          username: "AngryTom",
          email: "newEmail@mail.com",
          password: "password",
          name: "Thomas Tickle",
          bio: "I love cats and JavaScript!",
          avatar_url:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          github_url: "https://github.com",
        });
      });
  });
  test("404: responds with error if invalid user", () => {
    return request(app)
      .patch("/api/users/13000")
      .send({
        user: {
          username: "AngryTom",
          email: "newEmail@mail.com",
          password: "password",
          name: "Thomas Tickle",
          bio: "I love cats and JavaScript!",
          avatar_url:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        },
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User not found");
      });
  });
  test("400: responds with error when passed invalid user objects", () => {
    return request(app)
      .patch("/api/users/1")
      .send({
        user: {
          email: "newEmail@mail.com",
          password: "password",
          name: "Thomas Tickle",
          bio: "I love cats and JavaScript!",
          avatar_url:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
  test("400: responds with error when passed invalid user objects", () => {
    return request(app).patch("/api/users/1").send({
      username: "AngryTom",
      email: "newEmail@mail.com",
      password: "password",
      name: "Thomas Tickle",
      bio: "I love cats and JavaScript!",
      avatar_url:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    });
  });

  describe("POST /api/users", () => {
    test("201: should respond with posted user object", () => {
      return request(app)
        .post("/api/users")
        .send({
          user: {
            username: "BigLad14",
            avatar_url:
              "https://previews.123rf.com/images/ratoca/ratoca1203/ratoca120300226/12748273-funny-cartoon-face.jpg",
            email: "biglad14@gmail.com",
            name: "James",
            bio: "I like trains",
            password: "password1",
            github_url: "https://github.com",
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
              github_url: expect.any(String),
            })
          );
        });
    });
    test("400: returns error message when passed email which is already in use", () => {
      return request(app)
        .post("/api/users")
        .send({
          user: {
            username: "BigLad13",
            avatar_url:
              "https://previews.123rf.com/images/ratoca/ratoca1203/ratoca120300226/12748273-funny-cartoon-face.jpg",
            email: "user1@mail.com",
            name: "James",
            bio: "I like trains",
            password: "password1",
            github_url: "https://github.com",
          },
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("email is already in use");
        });
    });
    test("400: returns error message when passed username which is already in use", () => {
      return request(app)
        .post("/api/users")
        .send({
          user: {
            username: "tickle122",
            avatar_url:
              "https://previews.123rf.com/images/ratoca/ratoca1203/ratoca120300226/12748273-funny-cartoon-face.jpg",
            email: "biglad13@gmail.com",
            name: "James",
            bio: "I like trains",
            password: "password1",
            github_url: "https://github.com",
          },
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("username is already in use");
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
});

describe("GET /api/users/:user_id/my-projects", () => {
  test("200: responds with an array of projects for a user", () => {
    return request(app)
      .get("/api/users/1/my-projects")
      .expect(200)
      .then(({ body: { projects } }) => {
        expect(projects).toHaveLength(2);
        projects.forEach((project) => {
          [
            {
              project_id: 1,
              project_author: 1,
              project_name: "Project 1",
              project_description: "Project 1 description",
              project_created_at: "1669852800000",
              required_members: 3,
            },
            {
              project_id: 4,
              project_author: 1,
              project_name: "Project 4",
              project_description: "Project 4 description",
              project_created_at: "1669852800000",
              required_members: 3,
            },
          ];
        });
      });
  });
  test("200: responds with an empty array when user has no projects", () => {
    return request(app)
      .get("/api/users/4/my-projects")
      .expect(200)
      .then(({ body: { projects } }) => {
        expect(projects).toHaveLength(0);
      });
  });
  test("404: responds with error message when user_id that does not exist", () => {
    return request(app)
      .get("/api/users/148/my-projects")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("No user found with that ID");
      });
  });
});

describe("GET /api/users/:user_id/project-associate", () => {
  test("200: responds with an array of projects for a user", () => {
    return request(app)
      .get("/api/users/1/project-associate")
      .expect(200)
      .then(({ body: { projects } }) => {
        expect(projects).toHaveLength(3);
        projects.forEach((project) => {
          [
            {
              project_id: 2,
              member_id: 1,
              project_author: 2,
              project_name: "Project 2",
              project_description: "Project 2 description",
              project_created_at: "1669852800000",
              required_members: 3,
            },
            {
              project_id: 3,
              member_id: 1,
              project_author: 3,
              project_name: "Project 3",
              project_description: "Project 3 description",
              project_created_at: "1669852800000",
              required_members: 3,
            },
            {
              project_id: 6,
              member_id: 1,
              project_author: 3,
              project_name: "Project 6",
              project_description: "Project 6 description",
              project_created_at: "1669852800000",
              required_members: 1,
            },
          ];
        });
      });
  });
  test("200: responds with an empty array when user has no projects", () => {
    return request(app)
      .get("/api/users/4/project-associate")
      .expect(200)
      .then(({ body: { projects } }) => {
        expect(projects).toHaveLength(0);
      });
  });
  test("404: responds with error message when user_id that does not exist", () => {
    return request(app)
      .get("/api/users/148/project-associate")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("No user found with that ID");
      });
  });
});

describe("GET /api/users/:user_id/my-requests", () => {
  test("200: responds with an array of project members requests for a user", () => {
    return request(app)
      .get("/api/users/1/my-requests")
      .expect(200)
      .then(({ body: { projects } }) => {
        expect(projects).toHaveLength(1);
        expect(projects[0]).toEqual({
          project_id: 3,
          project_author: 3,
          project_name: "Project 3",
          project_description: "Project 3 description",
          project_created_at: "1669852800000",
          required_members: 3,
          user_id: 1,
        });
      });
  });
  test("200: responds with an empty array when user has no projects", () => {
    return request(app)
      .get("/api/users/4/my-requests")
      .expect(200)
      .then(({ body: { projects } }) => {
        expect(projects).toHaveLength(0);
      });
  });
  test("404: responds with error message when user_id that does not exist", () => {
    return request(app)
      .get("/api/users/148/my-requests")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("No user found with that ID");
      });
  });
});

describe("POST /api/users/login", () => {
  test("201: responds with user object when login was successful", () => {
    return request(app)
      .post("/api/users/login")
      .send({
        email: "sasha1@mail.com",
        password: "password",
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
            github_url: expect.any(String),
          })
        );
      });
  });

  test("404: responds with error message when email that does not exist", () => {
    return request(app)
      .post("/api/users/login")
      .send({
        email: "asqwe@gmail.com",
        password: "password",
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("No user found with that Email");
      });
  });

  test("404: responds with error message when password is incorrect", () => {
    return request(app)
      .post("/api/users/login")
      .send({
        email: "sasha1@mail.com",
        password: "password1",
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Password is incorrect!");
      });
  });
});
