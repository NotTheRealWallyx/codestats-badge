import express from 'express';
import { getCodeStatsSVG } from './codeStatsService.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/code-stats', async (req, res) => {
  const username = req.query.user;
  const { limit, showProgressBar, theme } = req.query;
  if (!username) return res.status(400).send('Missing ?user=username');

  try {
    const svg = await getCodeStatsSVG(username, {
      limit,
      showProgressBar: showProgressBar !== 'false',
      theme: theme || 'dark'
    });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 's-maxage=3600');
    res.send(svg);
  } catch (error) {
    res.status(500).send('Error fetching user data from Code::Stats');
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
