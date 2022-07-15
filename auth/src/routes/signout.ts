import { Router } from "express";

const router = Router();

router.get("/api/users/signout", async (req, res) => {
  res.send("Hello world");
});

export { router as signoutRouter };
