import { getCodeStatsSVG } from '../src/codeStatsService.js';
import { validateRequest } from '../src/utils.js';

export default async function handler(req, res) {
  const { user: username, limit, showProgressBar, theme } = req.query;
  const themeValue = theme || 'dark';

  const validation = validateRequest({ username, theme: themeValue });
  if (!validation.valid) {
    res.status(validation.status).send(validation.message);
    return;
  }

  try {
    const svg = await getCodeStatsSVG(username, {
      limit,
      showProgressBar: showProgressBar !== 'false',
      theme: themeValue
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
