const request = require("supertest");
const app = require("../index");

require("./setup");

describe("Auth API", () => {

  test("Register user", async () => {

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test123@gmail.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);

  }, 10000);

});