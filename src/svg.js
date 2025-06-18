const LEVEL_FACTOR = 0.025;

function calculateLevel(xp) {
    return Math.floor(LEVEL_FACTOR * Math.sqrt(xp));
}

function xpForLevel(level) {
    return Math.pow(level / LEVEL_FACTOR, 2);
}

function formatNumber(num) {
    return num.toLocaleString();
}

function generateSVG(username, totalXP, topLangs) {
    const level = calculateLevel(totalXP);
    const currentLevelXP = xpForLevel(level);
    const nextLevelXP = xpForLevel(level + 1);
    const progressToNext = Math.max(0, nextLevelXP - totalXP);
    const progressPercentage = Math.min(100, Math.max(0, ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100));

    const colWidth = 190;
    const rowHeight = 20;
    const numRows = Math.ceil(topLangs.length / 2);
    const langStartY = 115;
    const baseHeight = langStartY + (numRows > 0 ? (numRows - 1) * rowHeight : 0) + 25;
    const svgHeight = baseHeight;

    const langLines = topLangs.map((lang, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 10 + col * colWidth;
        const y = langStartY + row * rowHeight;
        return `<text x="${x}" y="${y}" font-size="14" fill="#c9d1d9">${lang.name}: Level ${lang.level}</text>`;
    }).join('');

    return `
    <svg width="400" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <style>
        text { font-family: Arial, sans-serif; }
        .title { font-weight: bold; }
      </style>
      <rect width="100%" height="100%" fill="#0d1117" stroke="#fff" stroke-width="1" rx="5"/>
      <text x="50%" y="25" font-size="16" fill="#58a6ff" text-anchor="middle" class="title">Code::Stats</text>
      <text x="50%" y="45" font-size="14" fill="#c9d1d9" text-anchor="middle">${username} (Level ${level} – ${formatNumber(progressToNext)} XP to next)</text>
      <text x="10" y="65" font-size="14" fill="#8b949e">Total XP: ${formatNumber(totalXP)}</text>

      <rect x="10" y="75" width="380" height="10" fill="#30363d" rx="5"/>
      <rect x="10" y="75" width="${Math.round(3.8 * progressPercentage)}" height="10" fill="#58a6ff" rx="5"/>

      ${langLines}
    </svg>`;
}

module.exports = { generateSVG, calculateLevel };