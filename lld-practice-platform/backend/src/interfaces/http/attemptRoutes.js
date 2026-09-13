import { Router } from "express";
import { practiceService } from "../../application/container.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { problemId, learnerId = "demo-user" } = req.body;
    if (!problemId) return res.status(400).json({ success: false, message: "problemId is required" });
    res.status(201).json({ success: true, data: await practiceService.startAttempt(problemId, learnerId) });
  } catch (e) { next(e); }
});

router.get("/history", async (req, res, next) => {
  try {
    res.json({ success: true, data: await practiceService.history(req.query.learnerId || "demo-user") });
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json({ success: true, data: await practiceService.getAttempt(req.params.id) });
  } catch (e) { next(e); }
});

router.put("/:id", async (req, res, next) => {
  try {
    res.json({ success: true, data: await practiceService.saveAttempt(req.params.id, req.body) });
  } catch (e) { next(e); }
});

router.post("/:id/submit", async (req, res, next) => {
  try {
    res.json({ success: true, data: await practiceService.submitAttempt(req.params.id) });
  } catch (e) { next(e); }
});

router.get("/:id/evaluation", async (req, res, next) => {
  try {
    const attempt = await practiceService.getAttempt(req.params.id);
    res.json({ success: true, data: attempt.evaluation, status: attempt.status });
  } catch (e) { next(e); }
});

export default router;
