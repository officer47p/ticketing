import { Router } from "express";

const router = Router();

router.get("/api/users/signin", async (req, res) => {
  res.send("Hello signin route");
});

export { router as signinRouter };
