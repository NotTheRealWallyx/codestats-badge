// index.js
// Simple Node.js + Express server for Code::Stats SVG badge

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const LEVEL_FACTOR = 0.025;

function calculateLevel(xp) {
    return Math.floor(LEVEL_FACTOR * Math.sqrt(xp));
}

function xpForLevel(level) {
    return Math.pow(level / LEVEL_FACTOR, 2);
}

function generateSVG(username, totalXP, topLangs) {
    const level = calculateLevel(totalXP);
    const currentLevelXP = xpForLevel(level);
    const nextLevelXP = xpForLevel(level + 1);
    const progressToNext = Math.max(0, nextLevelXP - totalXP);
    const progressPercentage = Math.min(100, Math.max(0, ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100));

    const langLines = topLangs.map((lang, i) => `
    <text x="10" y="${100 + i * 20}" font-size="14" fill="#c9d1d9">${lang.name}: Level ${lang.level}</text>`).join('');

    return `
    <svg width="400" height="${140 + topLangs.length * 20}" xmlns="http://www.w3.org/2000/svg">
      <style>
        text { font-family: Arial, sans-serif; }
      </style>
      <rect width="100%" height="100%" fill="#0d1117"/>
      <text x="10" y="25" font-size="16" fill="#58a6ff">Code::Stats</text>
      <text x="10" y="45" font-size="14" fill="#c9d1d9">${username} - Level ${level} – ${progressToNext} XP to next</text>
      <text x="10" y="65" font-size="14" fill="#8b949e">Total XP: ${totalXP}</text>

      <!-- Progress bar -->
      <rect x="10" y="75" width="380" height="10" fill="#30363d" rx="5"/>
      <rect x="10" y="75" width="${Math.round(3.8 * progressPercentage)}" height="10" fill="#58a6ff" rx="5"/>

      ${langLines}
    </svg>`;
}

app.get('/api/code-stats', async (req, res) => {
    const username = req.query.user;
    if (!username) return res.status(400).send('Missing ?user=username');

    try {
        const { data } = await axios.get(`https://codestats.net/api/users/${username}`);
        const totalXP = data.total_xp;

        const languages = Object.entries(data.languages)
            .map(([name, info]) => ({ name, xp: info.xps, level: calculateLevel(info.xps) }))
            .sort((a, b) => b.xp - a.xp)
            .slice(0, 5);

        const svg = generateSVG(username, totalXP, languages);

        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 's-maxage=3600'); // 1hr cache
        res.send(svg);
    } catch (error) {
        res.status(500).send('Error fetching user data from Code::Stats');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
