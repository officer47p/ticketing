import { Router } from "express";

const router = Router();

router.post("/api/users/signout", async (req, res) => {
  res.send("Hello signout route");
});

export { router as signoutRouter };
