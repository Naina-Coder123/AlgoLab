const express = require("express");
const path = require("path");

const app = express();

/* ✅ 1. parse JSON */
app.use(express.json());

/* ✅ 2. mount sorting route */
const sortingRoutes = require("./routes/sortingRoutes");
app.use("/api/sort", sortingRoutes);

/* ✅ 3. serve frontend */
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

/* ✅ 4. fallback LAST */
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;
