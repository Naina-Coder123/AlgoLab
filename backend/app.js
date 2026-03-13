const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* =================== 1. Middleware =================== */
app.use(express.json()); // parse JSON

// Allow all origins (for development). Replace "*" with your frontend URL in production
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* =================== 2. API Routes =================== */
const sortingRoutes = require("./routes/sortingRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/sort", sortingRoutes);
app.use("/api/ai", aiRoutes);

/* =================== 3. Serve Frontend =================== */
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

/* =================== 4. Fallback for React Router =================== */

app.get(/.*/, (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* =================== 5. Start Server =================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

module.exports = app;