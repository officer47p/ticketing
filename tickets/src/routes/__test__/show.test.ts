import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const response = await request(app).get(`/api/tickets/someticketid`).send();
  console.log(response.body);
  expect(response.statusCode).toEqual(404);
});

it("requrns the ticket if the ticket is found", async () => {
  const title = "some title";
  const price = 10;

  const ticketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title, price })
    .expect(201);

  const response = await request(app).get(
    `/api/tickets/${ticketResponse.body.id}`
  );

  expect(response.statusCode).toEqual(200);
  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
