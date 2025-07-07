import express from "express";
import { getCodeStatsSVG } from "./codeStatsService.js";
import { validateRequest } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/code-stats", async (req, res) => {
  const { user: username, limit, showProgressBar, theme } = req.query;
  const themeValue = theme || "dark";

  const validation = validateRequest({ username, theme: themeValue });
  if (!validation.valid) {
    res.status(validation.status).send(validation.message);
    return;
  }

  try {
    const svg = await getCodeStatsSVG(username, {
      limit,
      showProgressBar: showProgressBar !== "false",
      theme: themeValue,
    });
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-maxage=3600");
    res.send(svg);
  } catch {
    res.status(500).send("Error fetching user data from Code::Stats");
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
