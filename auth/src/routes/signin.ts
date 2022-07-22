import { Router, Request, Response } from "express";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { body } from "express-validator";

const router = Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
  }
);

export { router as signinRouter };
