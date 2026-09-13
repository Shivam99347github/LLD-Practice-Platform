import { Router } from "express";
import { practiceService } from "../../application/container.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.json({ success: true, data: await practiceService.listProblems() });
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json({ success: true, data: await practiceService.getProblem(req.params.id) });
  } catch (e) { next(e); }
});

export default router;
