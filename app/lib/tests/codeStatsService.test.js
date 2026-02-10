import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCodeStatsSVG, getDailyExperience } from "../codeStatsService.js";

const globalAny = global;

const mockUserData = {
  total_xp: 123456,
  languages: {
    JavaScript: { xps: 100000 },
    Python: { xps: 20000 },
    Ruby: { xps: 3000 },
    Go: { xps: 2000 },
    Rust: { xps: 1000 },
    PHP: { xps: 500 },
  },
};

describe("getCodeStatsSVG", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalAny.fetch = vi.fn();
  });

  it("should throw if username is missing", async () => {
    await expect(getCodeStatsSVG()).rejects.toThrow();
  });

  it("should return SVG for a valid user", async () => {
    globalAny.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserData,
    });
    const svg = await getCodeStatsSVG("testuser");
    expect(svg).toContain("<svg");
    expect(svg).toContain("testuser");
    expect(svg).toContain("Total XP: 123,456");
  });

  it("should limit the number of languages in the SVG", async () => {
    globalAny.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserData,
    });
    const svg = await getCodeStatsSVG("testuser", { limit: 2 });
    const langLines = svg.match(/class="lang-line"/g) || [];
    expect(langLines.length).toBe(2);
  });

  it("should throw on API error", async () => {
    globalAny.fetch.mockResolvedValueOnce({ ok: false });
    await expect(getCodeStatsSVG("testuser")).rejects.toThrow();
  });
});

describe("getDailyExperience", () => {
  it("should throw an error if username is missing", async () => {
    await expect(getDailyExperience()).rejects.toThrow("Missing username");
  });

  it("should return sorted daily experience", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            dates: {
              "2026-02-01": 100,
              "2026-02-03": 50,
              "2026-02-02": 200,
            },
          }),
      })
    );

    const result = await getDailyExperience("testuser");
    expect(result).toEqual([
      { date: "2026-02-01", xp: 100 },
      { date: "2026-02-02", xp: 200 },
      { date: "2026-02-03", xp: 50 },
    ]);
  });

  it("should throw an error if fetch fails", async () => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: false }));
    await expect(getDailyExperience("testuser")).rejects.toThrow("Failed to fetch user data");
  });
});
