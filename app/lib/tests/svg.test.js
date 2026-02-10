import { describe, expect, it } from "vitest";
import { generateCompactSVG, generateSVG, generateActivitySVG } from "../svg.js";

const username = "testuser";
const totalXP = 12345;
const topLangs = [
  { name: "JavaScript", level: 5 },
  { name: "Python", level: 3 },
];

describe("generateSVG", () => {
  it("renders dark theme by default", () => {
    const svg = generateSVG(username, totalXP, topLangs);
    expect(svg).toContain('fill="#0d1117"'); // background
    expect(svg).toContain('stroke="#fff"'); // border
    expect(svg).toContain('fill="#58a6ff"'); // title/progress
    expect(svg).toContain(username);
    expect(svg).toContain("JavaScript: Level 5");
  });

  it("renders light theme", () => {
    const svg = generateSVG(username, totalXP, topLangs, { theme: "light" });
    expect(svg).toContain('fill="#fff"'); // background
    expect(svg).toContain('stroke="#0d1117"'); // border
    expect(svg).toContain('fill="#0969da"'); // title/progress
    expect(svg).toContain(username);
    expect(svg).toContain("Python: Level 3");
  });

  it("hides progress bar if showProgressBar is false", () => {
    const svg = generateSVG(username, totalXP, topLangs, {
      showProgressBar: false,
    });
    expect(svg).not.toContain('rect x="10" y="75" width="380" height="10"');
  });

  it("shows progress bar if showProgressBar is true", () => {
    const svg = generateSVG(username, totalXP, topLangs, {
      showProgressBar: true,
    });
    expect(svg).toContain('rect x="10" y="75" width="380" height="10"');
  });
});

describe("generateCompactSVG", () => {
  it("renders dark theme by default", () => {
    const svg = generateCompactSVG(username, totalXP);
    expect(svg).toContain('fill="#0d1117"');
    expect(svg).toContain('stroke="#fff"');
    expect(svg).toContain('fill="#c9d1d9"');
    expect(svg).toContain(username);
  });

  it("renders light theme", () => {
    const svg = generateCompactSVG(username, totalXP, { theme: "light" });
    expect(svg).toContain('fill="#fff"');
    expect(svg).toContain('stroke="#0d1117"');
    expect(svg).toContain('fill="#24292f"');
    expect(svg).toContain(username);
  });
});

describe("generateActivitySVG", () => {
  it("should generate SVG with activity squares", () => {
    const dailyExperience = [
      { date: "2026-02-01", xp: 100 },
      { date: "2026-02-02", xp: 200 },
      { date: "2026-02-03", xp: 50 },
    ];

    const svg = generateActivitySVG(dailyExperience, "light");
    expect(svg).toContain("fill-opacity");
    expect(svg).toContain("fill=");
  });

  it("should handle empty daily experience", () => {
    const svg = generateActivitySVG([], "dark");
    expect(svg).toContain("<svg");
    expect(svg).not.toContain("fill-opacity");
  });
});
