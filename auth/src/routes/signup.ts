import { Router } from "express";

const router = Router();

router.get("/api/users/signup", async (req, res) => {
  res.send("Hello world");
});

export { router as signupRouter };
