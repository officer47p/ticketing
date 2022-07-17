import { Router } from "express";

const router = Router();

router.post("/api/users/signin", async (req, res) => {
  res.send("Hello signin route");
});

export { router as signinRouter };
