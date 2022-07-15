import { Router } from "express";

const router = Router();

router.get("/api/users/signup", async (req, res) => {
  res.send("Hello signup route");
});

export { router as signupRouter };
