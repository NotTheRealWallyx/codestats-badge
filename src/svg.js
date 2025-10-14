export const LEVEL_FACTOR = 0.025;

export function calculateLevel(xp) {
  return Math.floor(LEVEL_FACTOR * Math.sqrt(xp));
}

export function xpForLevel(level) {
  return (level / LEVEL_FACTOR) ** 2;
}

export function formatNumber(num) {
  return num.toLocaleString();
}

const THEMES = {
  dark: {
    background: "#0d1117",
    border: "#fff",
    title: "#58a6ff",
    text: "#c9d1d9",
    label: "#8b949e",
    progressBg: "#30363d",
    progress: "#58a6ff",
  },
  light: {
    background: "#fff",
    border: "#0d1117",
    title: "#0969da",
    text: "#24292f",
    label: "#57606a",
    progressBg: "#d0d7de",
    progress: "#0969da",
  },
};

export function generateSVG(username, totalXP, topLangs, style = {}) {
  const { showProgressBar = true, theme = "dark", showLangXP = false } = style;

  const palette = THEMES[theme] || THEMES.dark;

  const level = calculateLevel(totalXP);
  const currentLevelXP = xpForLevel(level);
  const nextLevelXP = xpForLevel(level + 1);
  const progressToNext = Math.max(0, nextLevelXP - totalXP);
  const progressPercentage = Math.min(
    100,
    Math.max(
      0,
      ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100,
    ),
  );

  const colWidth = 190;
  const rowHeight = 20;
  const progressBarOffset = showProgressBar ? 20 : 0;
  const langStartY = 95 + progressBarOffset;
  const numRows = Math.ceil(topLangs.length / 2);
  const baseHeight =
    langStartY + (numRows > 0 ? (numRows - 1) * rowHeight : 0) + 25;
  const svgHeight = baseHeight;

  const langLines = topLangs
    .map((lang, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 10 + col * colWidth;
      const y = langStartY + row * rowHeight;
      const value = showLangXP
        ? `${formatNumber(lang.xp)} XP`
        : `Level ${lang.level}`;
      return `<text x="${x}" y="${y}" font-size="14" fill="${palette.text}" class="lang-line">${lang.name}: ${value}</text>`;
    })
    .join("");

  return `
    <svg width="400" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <style>
        text { font-family: Arial, sans-serif; }
        .title { font-weight: bold; }
      </style>
      <rect width="100%" height="100%" fill="${palette.background}" stroke="${palette.border}" stroke-width="1" rx="5"/>
      <text x="50%" y="25" font-size="16" fill="${palette.title}" text-anchor="middle" class="title">Code::Stats</text>
      <text x="50%" y="45" font-size="14" fill="${palette.text}" text-anchor="middle">${username} (Level ${level} – ${formatNumber(progressToNext)} XP to next)</text>
      <text x="10" y="65" font-size="14" fill="${palette.label}">Total XP: ${formatNumber(totalXP)}</text>
      ${showProgressBar
      ? `<rect x="10" y="75" width="380" height="10" fill="${palette.progressBg}" rx="5"/>
             <rect x="10" y="75" width="${Math.round(3.8 * progressPercentage)}" height="10" fill="${palette.progress}" rx="5"/>`
      : ""
    }
      ${langLines}
    </svg>`;
}

export function generateCompactSVG(username, totalXP, style = {}) {
  const { theme = "dark" } = style;
  const palette = THEMES[theme] || THEMES.dark;

  const badgeHeight = 20;
  const usernameText = username || "";
  const xpText = `Total XP: ${formatNumber(totalXP)}`;
  const text = `${usernameText} • ${xpText}`;
  const width = Math.max(80, text.length * 7 + 16);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${badgeHeight}">
      <rect width="100%" height="100%" fill="${palette.background}" stroke="${palette.border}" stroke-width="1" rx="3"/>
      <text x="8" y="14" fill="${palette.text}" font-family="Verdana, Geneva, sans-serif" font-size="12">
        ${usernameText} • ${xpText}
      </text>
    </svg>
  `;
}
