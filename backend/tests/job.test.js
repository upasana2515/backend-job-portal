const request = require("supertest");
const app = require("../index");

require("./setup");

let token = "";

describe("Job APIs", () => {

  test("Register User", async () => {

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@gmail.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(201);

  }, 10000);

  test("Login User", async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@gmail.com",
        password: "123456",
      });

    token = res.body.token;

    expect(res.statusCode).toBe(200);

  }, 10000);

  test("Create Job", async () => {

    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", token)
      .send({
        title: "Backend Developer",
        company: "Amazon",
        location: "Delhi",
        salary: "12 LPA",
        description: "Node.js developer needed"
      });

    expect(res.statusCode).toBe(201);

  }, 10000);

});