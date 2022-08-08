import request from "supertest";
import { app } from "../../app";

it("should return a list of tickets", async () => {
  const ticketsPayload = [
    { title: "dknfksdsf", price: 43 },
    { title: "fdgfd", price: 10 },
    { title: "fggg", price: 20 },
  ];

  ticketsPayload.forEach(
    async (ticket) =>
      await request(app)
        .post("/api/tickets")
        .set("Cookie", signin())
        .send({ title: ticket.title, price: ticket.price })
  );

  const response = await request(app).get("/api/tickets").send();

  expect(response.statusCode).toEqual(200);
  expect(response.body).toHaveLength(3);
});
