import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler } from "@jdnfadjks/common";
import { NotFoundError } from "@jdnfadjks/common";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
