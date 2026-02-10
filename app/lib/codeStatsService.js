// Use native fetch instead of axios
import { calculateLevel, generateCompactSVG, generateSVG } from "./svg.js";

export async function getCodeStatsSVG(username, options = {}) {
  if (!username) throw new Error("Missing username");
  const {
    limit = 6,
    showProgressBar = true,
    theme = "dark",
    showLangXP = false,
    compact = false,
  } = options;

  const langLimit = Math.max(1, Math.min(20, parseInt(limit, 10) || 6));
  const response = await fetch(`https://codestats.net/api/users/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const data = await response.json();
  const totalXP = data.total_xp;
  const languages = Object.entries(data.languages)
    .map(([name, info]) => ({
      name,
      xp: info.xps,
      level: calculateLevel(info.xps),
    }))
    .sort((a, b) => b.xp - a.xp)
    .slice(0, langLimit);

  if (compact) {
    return generateCompactSVG(username, totalXP, { theme });
  }

  return generateSVG(username, totalXP, languages, {
    showProgressBar,
    theme,
    showLangXP,
  });
}

export async function getDailyExperience(username) {
  if (!username) throw new Error("Missing username");

  const response = await fetch(`https://codestats.net/api/users/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  const dailyExperience = Object.entries(data.dates).map(([date, xp]) => ({
    date,
    xp,
  }));

  return dailyExperience.sort((a, b) => new Date(a.date) - new Date(b.date));
}