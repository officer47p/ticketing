import request from "supertest";
import { app } from "../../app";

it("should return a 404 if the provided id does not exist", async () => {
  const response = await request(app)
    .put(`/api/tickets/someticketid`)
    .set("Cookie", signin())
    .send({ title: "dskjfnds", price: 10 });

  expect(response.statusCode).toEqual(404);
});

it("should return a 401 if the user is not authenticated", async () => {
  const response = await request(app)
    .put("/api/tickets/someticketid")
    .send({ title: "dskjfnds", price: 10 });

  expect(response.statusCode).toEqual(401);
});

it("should return a 401 if the user does not own the ticket", async () => {
  const newTicketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "some title", price: 10 });

  const ticketId = newTicketResponse.body.id;

  const response = await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", signin())
    .send({ title: "some new title", price: 10 });

  expect(response.statusCode).toEqual(401);
});

it("should return a 400 if the user provides an invalid title or price", async () => {
  const cookie = signin();

  const newTicketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "some title", price: 10 });

  const ticketId = newTicketResponse.body.id;

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 100 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({ title: "dljsfnjk", price: -10 })
    .expect(400);
});

it("should update the ticket provided valid inputs", async () => {
  const cookie = signin();

  const newTicketResponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "some title", price: 10 });

  const ticketId = newTicketResponse.body.id;

  const response = await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({ title: "some new title", price: 100 });

  expect(response.statusCode).toEqual(200);
  expect(response.body.title).toEqual("some new title");
  expect(response.body.price).toEqual(100);
});
