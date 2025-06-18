// index.js
// Simple Node.js + Express server for Code::Stats SVG badge

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

function generateSVG(username, totalXP, topLangs) {
    const langLines = topLangs.map((lang, i) => `
    <text x="10" y="${60 + i * 20}" font-size="14" fill="#c9d1d9">${lang.name}: ${lang.xp} XP</text>`).join('');

    return `
    <svg width="320" height="${80 + topLangs.length * 20}" xmlns="http://www.w3.org/2000/svg">
      <style>
        text { font-family: Arial, sans-serif; }
      </style>
      <rect width="100%" height="100%" fill="#0d1117"/>
      <text x="10" y="30" font-size="16" fill="#58a6ff">${username}'s Code::Stats</text>
      <text x="10" y="45" font-size="14" fill="#8b949e">Total XP: ${totalXP}</text>
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
            .map(([name, info]) => ({ name, xp: info.xps }))
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
