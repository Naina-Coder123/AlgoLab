const express = require("express");
const path = require("path");
const aiRoutes = require("./routes/aiRoutes");
const app = express();
require("dotenv").config();

/* ✅ 1. parse JSON */
app.use(express.json());

/* ✅ 2. mount sorting route */
const sortingRoutes = require("./routes/sortingRoutes");
app.use("/api/sort", sortingRoutes);
console.log("AI routes loaded:", aiRoutes);

app.use("/api/ai",aiRoutes);

/* ✅ 3. serve frontend */
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

/* ✅ 4. fallback LAST */
// app.use((req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;
