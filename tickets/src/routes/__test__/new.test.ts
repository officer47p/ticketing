import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

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

it("returns an error if an invalid title is provided", async () => {
  const response1 = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "",
      price: 10,
    });

  expect(response1.statusCode).toEqual(400);

  const response2 = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      price: 10,
    });

  expect(response2.statusCode).toEqual(400);
});

it("returns an error if an invalid price is provided", async () => {
  const response1 = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "dsjnfdsk",
      price: -10,
    });

  expect(response1.statusCode).toEqual(400);

  const response2 = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "dsjnfdsk",
    });

  expect(response2.statusCode).toEqual(400);
});

it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets).toHaveLength(0);

  const ticketPayload = {
    title: "kjdnfkds",
    price: 10,
  };

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send(ticketPayload);

  expect(response.statusCode).toEqual(201);

  tickets = await Ticket.find({});
  expect(tickets).toHaveLength(1);
  expect(tickets[0].title).toEqual(ticketPayload.title);
  expect(tickets[0].price).toEqual(ticketPayload.price);
});

it("publishes an event", async () => {
  const ticketPayload = {
    title: "kjdnfkds",
    price: 10,
  };

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send(ticketPayload);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
