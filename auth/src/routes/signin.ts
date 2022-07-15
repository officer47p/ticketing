import { Router } from "express";

const router = Router();

router.get("/api/users/signin", async (req, res) => {
  res.send("Hello world");
});

export { router as signinRouter };
