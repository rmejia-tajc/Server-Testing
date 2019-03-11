const request = require("supertest");

const db = require("../data/dbConfig.js");

const server = require("./server.js");

describe("server.js", () => {
  afterEach(async () => {
    await db("users").truncate();
  }); // clean up the database so each test can be unaffected by the previous test. Can be moved up to clean up after all tests or down to clean up after certain test(s)!

  it("should set testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("POST", () => {
    it("should return 201 when user is saved", async () => {
      const body = { name: "test" };

      let res = await request(server)
        .post("/")
        .send(body);

      expect(res.status).toBe(201);
    });

    it("should return 400 if no name is provided", async () => {
      const body = { name: "" };

      let res = await request(server)
        .post("/")
        .send(body);

      expect(res.status).toBe(400);
    });
  });

  describe("DELETE", () => {
    it("should return 204 when removing a user", async () => {
      const body = { name: "test" };

      await request(server)
        .post("/")
        .send(body);

      let response = await request(server).delete(`/1`);

      expect(response.status).toBe(204);
    });

    it("should return 404 when the user does not exists", async () => {
      let response = await request(server).delete(`/1`);

      expect(response.status).toBe(404);
    });
  });
});
