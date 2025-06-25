import { getCodeStatsSVG } from '../src/codeStatsService.js';

export default async function handler(req, res) {
  const { user: username, limit, showProgressBar, theme } = req.query;
  if (!username) {
    res.status(400).send('Missing ?user=username');
    return;
  }
  try {
    const svg = await getCodeStatsSVG(username, {
      limit,
      showProgressBar: showProgressBar !== 'false',
      theme: theme || 'dark'
    });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Content-Disposition', 'inline; filename="badge.svg"');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 's-maxage=3600');
    res.send(svg);
  } catch (error) {
    res.status(500).send('Error fetching user data from Code::Stats');
  }
}
