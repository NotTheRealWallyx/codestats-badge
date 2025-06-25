import axios from 'axios';
import { generateSVG, calculateLevel } from './svg.js';

// type BadgeStyle = {
//   showProgressBar?: boolean;
//   theme?: 'light' | 'dark';
// }

export async function getCodeStatsSVG(username, options = {}) {
  if (!username) throw new Error('Missing username');
  const {
    limit = 6,
    showProgressBar = true,
    theme = 'dark'
  } = options;

  const langLimit = Math.max(1, Math.min(20, parseInt(limit) || 6));
  const { data } = await axios.get(
    `https://codestats.net/api/users/${username}`
  );
  const totalXP = data.total_xp;
  const languages = Object.entries(data.languages)
    .map(([name, info]) => ({
      name,
      xp: info.xps,
      level: calculateLevel(info.xps),
    }))
    .sort((a, b) => b.xp - a.xp)
    .slice(0, langLimit);
  return generateSVG(username, totalXP, languages, { showProgressBar, theme });
}
