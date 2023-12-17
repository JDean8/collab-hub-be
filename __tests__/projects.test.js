const { seed } = require("../dist/db/data/seeds/seed.js");
const testData = require("../dist/db/data/test-data/index");
const db = require("../dist/db/pool.js");
const request = require("supertest");
const { app } = require("../dist/api.js");
const { describe } = require("node:test");

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

describe("POST /api/projects", () => {
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

  test("400: responds with a message when passed an invalid project object", () => {
    return request(app)
      .post("/api/projects")
      .send({
        project: {
          project_description: "test",
          profile_pic: "https://testuser.com",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("GET /api/projects/:project_id", () => {
  test("200: responds with a project object", () => {
    return request(app)
      .get("/api/projects/1")
      .expect(200)
      .then(({ body: { project } }) => {
        expect(project.project_id).toBe(1);
        expect(project.project_author).toBe(1);
        expect(project.project_name).toBe("Project 1");
        expect(project.project_description).toBe("Project 1 description");
        expect(project.project_created_at).toBe("1669852800000");
        expect(project.required_members).toBe(3);
      });
  })
  test("404: responds with a message when passed a non-existent project_id", () => {
    return request(app)
      .get("/api/projects/100")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Project not found");
      });
  });
  test("404: responds with a message when passed a invalid project_id", () => {
    return request(app)
      .get("/api/projects/abc")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
})

describe("PATCH /api/projects/:project_id", () => {
  test("200: responds with an updated project object", () => {
    return request(app)
      .patch("/api/projects/1")
      .send({
        project: {
          project_name: "Project 1 Updated",
          project_description: "Project 1 description updated",
          required_members: 4,
        },
      })
      .expect(200)
      .then(({ body: { project } }) => {
        expect(project.project_id).toBe(1);
        expect(project.project_author).toBe(1);
        expect(project.project_name).toBe("Project 1 Updated");
        expect(project.project_description).toBe(
          "Project 1 description updated"
        );
        expect(project.project_created_at).toBe("1669852800000");
        expect(project.required_members).toBe(4);
      });
  })
  test("200: responds with an updated project object when passed extra keys", () => {
    return request(app)
      .patch("/api/projects/1")
      .send({
        project: {
          project_name: "Project 1 Updated",
          project_description: "Project 1 description updated",
          required_members: 4,
          extra_key: "extra",
        },
      })
      .expect(200)
      .then(({ body: { project } }) => {
        expect(project.project_id).toBe(1);
        expect(project.project_author).toBe(1);
        expect(project.project_name).toBe("Project 1 Updated");
        expect(project.project_description).toBe(
          "Project 1 description updated"
        );
        expect(project.project_created_at).toBe("1669852800000");
        expect(project.required_members).toBe(4);
      });
  })
  test("400: responds with a message when passed an invalid project object", () => {
    return request(app)
      .patch("/api/projects/1")
      .send({
        project: {
          project_name: "Project 1 Updated",
          project_description: "Project 1 description updated",
          required_members: "abc",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
  test("404: responds with a message when passed when passed an empty body", () => {
    return request(app)
      .patch("/api/projects/1")
      .send({})
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
  test("404: responds with a message when passed a non-existent project_id", () => {
    return request(app)
      .patch("/api/projects/100")
      .send({
        project: {
          project_name: "Project 1 Updated",
          project_description: "Project 1 description updated",
          required_members: 4,
        },
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Project not found");
      });
  });
  test("404: responds with a message when passed a invalid project_id", () => {
    return request(app)
      .patch("/api/projects/abc")
      .send({
        project: {
          project_name: "Project 1 Updated",
          project_description: "Project 1 description updated",
          required_members: 4,
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
})

describe("GET /api/projects/:project_id/skills", () => {
  test("200: responds with an array of skills for a given project", () => {
    return request(app)
      .get("/api/projects/1/skills")
      .expect(200)
      .then(({ body: { skills } }) => {
        expect(skills).toHaveLength(2);
        expect(skills).toEqual([ { skill_id: 1, skill_name: 'JavaScript' }, { skill_id: 2, skill_name: 'React' } ])
      });
  })
  test("200: responds with an empty array when passed a project_id with no skills", () => {
    return request(app)
      .get("/api/projects/6/skills")
      .expect(200)
      .then(({ body: { skills } }) => {
        expect(skills).toHaveLength(0);
      });
  })
  test("404: responds with a message when passed a non-existent project_id", () => {
    return request(app)
      .get("/api/projects/100/skills")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Project not found");
      });
  })
  test("404: responds with a message when passed an invalid project_id", () => {
    return request(app)
      .get("/api/projects/abc/skills")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
})

describe("DELETE /api/projects/:project_id", () => {
  test("204: responds with no content", () => {
    return request(app)
      .delete("/api/projects/5")
      .expect(204)
  })
})

describe("GET /api/projects/:project_id/status", () => {
  test("200: responds with a status object", () => {
    return request(app)
      .get("/api/projects/1/status")
      .expect(200)
      .then(({ body: { status } }) => {
        expect(status).toBe("open")
      });
  })
  test("404: responds with a message when passed a non-existent project_id", () => {
    return request(app)
      .get("/api/projects/100/status")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Project not found");
      });
  })
})

describe("POST /api/projects/:project_id/status", () => {
  test("201: responds with a status object", () => {
    return request(app)
      .post("/api/projects/6/status")
      .send({
        status: {
          status: "completed",
        },
      })
      .expect(201)
      .then((result) => {
        expect(result.body).toEqual({ project_id: 6, status_id: 3 })
      });
  })
  test("201: responds with a status object when passed extra keys", () => {
    return request(app)
      .post("/api/projects/6/status")
      .send({
        status: {
          status: "completed",
          extra_key: "extra",
        },
      })
      .expect(201)
      .then((result) => {
        expect(result.body).toEqual({ project_id: 6, status_id: 3 })
      });
  })
  test("400: responds with a message when passed an invalid status object", () => {
    return request(app)
      .post("/api/projects/6/status")
      .send({
        status: {
          status: "invalid",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
  test("404: responds with a message when passed a non-existent project_id", () => {
    return request(app)
      .post("/api/projects/100/status")
      .send({
        status: {
          status: "completed",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
})

describe("PATCH /api/projects/:project_id/status", () => {
  test("200: responds with a status object", () => {
    return request(app)
      .patch("/api/projects/1/status")
      .send({
        status: {
          status: "completed",
        },
      })
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual({ project_id: 1, status_id: 3 })
      });
  })
  test("200: responds with a status object when passed extra keys", () => {
    return request(app)
      .patch("/api/projects/1/status")
      .send({
        status: {
          status: "completed",
          extra_key: "extra",
        },
      })
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual({ project_id: 1, status_id: 3 })
      });
  })
  test("400: responds with a message when passed an invalid status object", () => {
    return request(app)
      .patch("/api/projects/1/status")
      .send({
        status: {
          status: "invalid",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
  test("404: responds with a message when passed a non-existent project_id", () => {
    return request(app)
      .patch("/api/projects/100/status")
      .send({
        status: {
          status: "completed",
        },
      })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Project not found");
      });
  })
  test("400: responds with a message when passed an invalid project_id", () => {
    return request(app)
      .patch("/api/projects/abc/status")
      .send({
        status: {
          status: "completed",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
})

describe("POST /api/projects/:project_id/skills", () => {
  test("201: responds with a skill object", () => {
    return request(app)
      .post("/api/projects/1/skills")
      .send({
        skill: {
          skill_name: "Node",
        },
      })
      .expect(201)
      .then((result) => {
        expect(result.body).toEqual({ project_id: 1, skill_id: 3 })
      });
  })
  test("201: responds with a skill object when passed extra keys", () => {
    return request(app)
      .post("/api/projects/1/skills")
      .send({
        skill: {
          skill_name: "Node",
          extra_key: "extra",
        },
      })
      .expect(201)
      .then((result) => {
        expect(result.body).toEqual({ project_id: 1, skill_id: 3 })
      });
  })
  test("400: responds with a message when passed an invalid skill object", () => {
    return request(app)
      .post("/api/projects/1/skills")
      .send({
        skill: {
          skill_name: 123,
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
  test("400: responds with a message when passed a non-existent project_id", () => {
    return request(app)
      .post("/api/projects/100/skills")
      .send({
        skill: {
          skill_name: "Node",
        },
      })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  })
  test("400: responds with a message when passed a skill that already exists", () => {
    return request(app)
      .post("/api/projects/1/skills")
      .send({
        skill: {
          skill_name: "React",
        },
      })
      .expect(400)
      .then(( { body }) => {
        expect(body.msg).toBe("Skill already exists");
      });
  })
})

describe("DELETE /api/projects/:project_id/skills/:skill_id", () => {
  test("204: responds with no content", () => {
    return request(app)
      .delete("/api/projects/1/skills/1")
      .expect(204)
  })
  test("404: responds with a message when passed a non-existent project_id", () => {
    return request(app)
      .delete("/api/projects/100/skills/1")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Project not found");
      });
  })
  test("404: responds with a message when passed a skill that does not exist", () => {
    return request(app)
      .delete("/api/projects/1/skills/100")
      .expect(404)
      .then(( { body }) => {
        expect(body.msg).toBe("Skill not found");
      });
  })
})