const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

/* Routes */
const sortingRoutes = require("./routes/sortingRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/sort", sortingRoutes);
app.use("/api/ai", aiRoutes);

/* Serve React Frontend */
const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

app.get(/.*/, (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;