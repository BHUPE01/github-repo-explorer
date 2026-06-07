require("dotenv").config();

const express = require("express");
const cors = require("cors");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const githubRoutes = require("./routes/githubRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());

app.use(express.json());
app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/github", githubRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found", message: "Route does not exist." });
});

app.use(errorHandler);

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
  console.log(`GitHub token: ${process.env.GITHUB_TOKEN ? "configured" : "not set (rate limited)"}`);
});

module.exports = app;