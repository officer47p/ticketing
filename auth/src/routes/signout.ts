import { Router } from "express";

const router = Router();

router.get("/api/users/signout", async (req, res) => {
  res.send("Hello signout route");
});

export { router as signoutRouter };
