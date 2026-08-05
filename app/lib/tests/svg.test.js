import { describe, expect, it } from 'vitest';
import {
  generateCompactSVG,
  generateSVG,
  generateActivitySVG,
  activityQuartiles,
  activityLevel,
} from '../svg.js';

const username = 'testuser';
const totalXP = 12345;
const topLangs = [
  { name: 'JavaScript', level: 5 },
  { name: 'Python', level: 3 },
];

describe('generateSVG', () => {
  it('renders dark theme by default', () => {
    const svg = generateSVG(username, totalXP, topLangs);
    expect(svg).toContain('fill="#0d1117"'); // background
    expect(svg).toContain('stroke="#fff"'); // border
    expect(svg).toContain('fill="#58a6ff"'); // title/progress
    expect(svg).toContain(username);
    expect(svg).toContain('JavaScript: Level 5');
  });

  it('renders light theme', () => {
    const svg = generateSVG(username, totalXP, topLangs, { theme: 'light' });
    expect(svg).toContain('fill="#fff"'); // background
    expect(svg).toContain('stroke="#0d1117"'); // border
    expect(svg).toContain('fill="#0969da"'); // title/progress
    expect(svg).toContain(username);
    expect(svg).toContain('Python: Level 3');
  });

  it('hides progress bar if showProgressBar is false', () => {
    const svg = generateSVG(username, totalXP, topLangs, {
      showProgressBar: false,
    });
    expect(svg).not.toContain('rect x="10" y="75" width="380" height="10"');
  });

  it('shows progress bar if showProgressBar is true', () => {
    const svg = generateSVG(username, totalXP, topLangs, {
      showProgressBar: true,
    });
    expect(svg).toContain('rect x="10" y="75" width="380" height="10"');
  });

  it('renders with a border by default', () => {
    const svg = generateSVG(username, totalXP, topLangs);
    expect(svg).toContain('stroke="#fff"');
    expect(svg).toContain('stroke-width="1"');
  });

  it('renders without a border when borderless is true', () => {
    const svg = generateSVG(username, totalXP, topLangs, {
      borderless: true,
    });
    expect(svg).toContain('stroke="none"');
    expect(svg).toContain('stroke-width="0"');
    expect(svg).not.toContain('stroke="#fff"');
  });
});

describe('generateCompactSVG', () => {
  it('renders dark theme by default', () => {
    const svg = generateCompactSVG(username, totalXP);
    expect(svg).toContain('fill="#0d1117"');
    expect(svg).toContain('stroke="#fff"');
    expect(svg).toContain('fill="#c9d1d9"');
    expect(svg).toContain(username);
  });

  it('renders light theme', () => {
    const svg = generateCompactSVG(username, totalXP, { theme: 'light' });
    expect(svg).toContain('fill="#fff"');
    expect(svg).toContain('stroke="#0d1117"');
    expect(svg).toContain('fill="#24292f"');
    expect(svg).toContain(username);
  });

  it('renders without a border when borderless is true', () => {
    const svg = generateCompactSVG(username, totalXP, { borderless: true });
    expect(svg).toContain('stroke="none"');
    expect(svg).toContain('stroke-width="0"');
    expect(svg).not.toContain('stroke="#fff"');
  });
});

describe('generateActivitySVG', () => {
  it('should generate SVG with activity squares', () => {
    const dailyExperience = [
      { date: '2026-02-01', xp: 100 },
      { date: '2026-02-02', xp: 200 },
      { date: '2026-02-03', xp: 50 },
    ];

    const svg = generateActivitySVG(dailyExperience, 'light');
    expect(svg).toContain('fill-opacity');
    expect(svg).toContain('fill=');
  });

  it('should handle empty daily experience', () => {
    const svg = generateActivitySVG([], 'dark');
    expect(svg).toContain('<svg');
    expect(svg).not.toContain('fill-opacity');
  });

  it('never renders a real activity day below the opacity floor', () => {
    // A wide spread of XP values, including a day with only 1 XP, which
    // under the old continuous scale would render at ~0 opacity —
    // indistinguishable from an empty day.
    const dailyExperience = [
      { date: '2026-02-01', xp: 1 },
      { date: '2026-02-02', xp: 20 },
      { date: '2026-02-03', xp: 500 },
      { date: '2026-02-04', xp: 5000 },
    ];

    const svg = generateActivitySVG(dailyExperience, 'dark');
    const opacities = [...svg.matchAll(/fill-opacity="([\d.]+)"/g)].map(
      (match) => Number(match[1]),
    );

    expect(opacities.length).toBeGreaterThan(0);
    for (const opacity of opacities) {
      expect(opacity).toBeGreaterThanOrEqual(0.3);
    }
  });

  it('renders with a border by default', () => {
    const svg = generateActivitySVG([], 'dark');
    expect(svg).toContain('stroke="#fff"');
    expect(svg).toContain('stroke-width="1"');
  });

  it('renders without a border when borderless is true', () => {
    const svg = generateActivitySVG([], 'dark', new Date(), true);
    expect(svg).toContain('stroke="none"');
    expect(svg).toContain('stroke-width="0"');
    expect(svg).not.toContain('stroke="#fff"');
  });

  describe('generateActivitySVG week alignment', () => {
    it('should only render days passed of current week', () => {
      // Given
      const startMonday = new Date('2026-02-02T12:00:00Z');
      const today = new Date('2026-02-24T12:00:00Z'); // Tuesday

      const days = [];
      for (
        let d = new Date(startMonday);
        d <= today;
        d.setDate(d.getDate() + 1)
      ) {
        days.push(new Date(d));
      }

      const dailyExperience = days.map((date) => ({
        date: date.toISOString().split('T')[0],
        xp: 10,
      }));

      // When
      const svg = generateActivitySVG(dailyExperience, 'light', today);

      // Then
      const rects = svg.match(/<rect [^>]+>/g) || [];
      const xPositions = rects.map((r) =>
        Number((r.match(/x="([\d.]+)"/) || [null, null])[1]),
      );
      const validXPositions = xPositions.filter((x) => !isNaN(x));
      const uniqueColumns = [...new Set(validXPositions)];
      const lastColX = Math.max(...uniqueColumns);
      const lastColCount = validXPositions.filter((x) => x === lastColX).length;
      expect(lastColCount).toBe(2); // Only Monday and Tuesday on last column
    });
  });
});

describe('activityQuartiles / activityLevel', () => {
  it('returns [0, 0, 0] for no non-zero values', () => {
    expect(activityQuartiles([])).toEqual([0, 0, 0]);
  });

  it('buckets values into levels 0-3 by quartile', () => {
    const values = [1, 2, 3, 4, 100, 200, 300, 400];
    const quartiles = activityQuartiles(values); // [3, 100, 300]

    expect(activityLevel(3, quartiles)).toBe(0);
    expect(activityLevel(100, quartiles)).toBe(1);
    expect(activityLevel(300, quartiles)).toBe(2);
    expect(activityLevel(400, quartiles)).toBe(3);
  });

  it('puts every value in level 0 when activity is flat', () => {
    const quartiles = activityQuartiles([50, 50, 50]);
    expect(activityLevel(50, quartiles)).toBe(0);
  });
});
