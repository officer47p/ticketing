import request from "supertest";
import { app } from "../../app";

it("has a route handler listening to /api/tickets/ for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.statusCode).not.toEqual(404);
});

it("can only be accessed if the user is singed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.statusCode).toEqual(401);
});

it("returns an status other than 401 when the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({});

  expect(response.statusCode).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {});

it("returns an error if an invalid price is provided", async () => {});

it("creates a ticket with valid inputs", async () => {});
