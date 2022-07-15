import { Router } from "express";

const router = Router();

router.get("/api/users/currentuser", async (req, res) => {
  res.send("Hello currentuser route");
});

export { router as currentUserRouter };
