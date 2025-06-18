const express = require('express');
const axios = require('axios');
const { generateSVG, calculateLevel } = require('./svg');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/code-stats', async (req, res) => {
    const username = req.query.user;
    const limit = Math.max(1, Math.min(20, parseInt(req.query.limit) || 6)); // default 6, min 1, max 20
    if (!username) return res.status(400).send('Missing ?user=username');

    try {
        const { data } = await axios.get(`https://codestats.net/api/users/${username}`);
        const totalXP = data.total_xp;

        const languages = Object.entries(data.languages)
            .map(([name, info]) => ({ name, xp: info.xps, level: calculateLevel(info.xps) }))
            .sort((a, b) => b.xp - a.xp)
            .slice(0, limit);

        const svg = generateSVG(username, totalXP, languages);

        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 's-maxage=3600');
        res.send(svg);
    } catch (error) {
        res.status(500).send('Error fetching user data from Code::Stats');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
