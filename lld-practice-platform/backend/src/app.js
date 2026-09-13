import express from "express";
import cors from "cors";
import problemRoutes from "./interfaces/http/problemRoutes.js";
import attemptRoutes from "./interfaces/http/attemptRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "LLD Practice API is running" });
});

app.use("/api/problems", problemRoutes);
app.use("/api/attempts", attemptRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

export default app;
