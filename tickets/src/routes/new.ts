import { Router } from "express";
import { requireAuth } from "@jdnfadjks/common";

const router = Router();

router.post("/api/tickets", requireAuth, async (req, res) => {
  res.send();
});

export { router as createTicketRouter };
