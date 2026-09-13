import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDatabase } from "./infrastructure/database.js";

const PORT = process.env.PORT || 5000;

await connectDatabase();

app.listen(PORT, () => {
  console.log(`LLD Practice API running on http://localhost:${PORT}`);
});
