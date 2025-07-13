import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock getCodeStatsSVG and validateTheme before importing handler
vi.mock("../../src/codeStatsService.js", () => ({
  getCodeStatsSVG: vi.fn(),
  validateTheme: vi.fn((theme) => theme === "light" || theme === "dark"),
}));

import { getCodeStatsSVG } from "../../src/codeStatsService.js";
import handler from "../code-stats.js";

function createRes() {
  const res = {};
  res.statusCode = 200;
  res.headers = {};
  res.status = vi.fn((code) => {
    res.statusCode = code;
    return res;
  });
  res.setHeader = vi.fn((key, value) => {
    res.headers[key] = value;
  });
  res.send = vi.fn((body) => {
    res.body = body;
    return res;
  });
  return res;
}

describe("api/code-stats.js handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 if user is missing", async () => {
    const req = { query: {} };
    const res = createRes();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Missing ?user=username");
  });

  it("returns SVG if user is provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = { query: { user: "testuser", limit: "2" } };
    const res = createRes();
    await handler(req, res);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      limit: "2",
      showProgressBar: true,
      theme: "dark",
      showLangXP: false,
    });
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "image/svg+xml");
    expect(res.setHeader).toHaveBeenCalledWith(
      "Content-Disposition",
      'inline; filename="badge.svg"',
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "X-Content-Type-Options",
      "nosniff",
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      "Cache-Control",
      "s-maxage=3600",
    );
    expect(res.send).toHaveBeenCalledWith("<svg>test</svg>");
    expect(res.status).not.toHaveBeenCalledWith(400);
  });

  it("returns 500 on error", async () => {
    getCodeStatsSVG.mockRejectedValue(new Error("fail"));
    const req = { query: { user: "testuser" } };
    const res = createRes();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(
      "Error fetching user data from Code::Stats",
    );
  });

  it("passes showProgressBar=false as boolean false", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = { query: { user: "testuser", showProgressBar: "false" } };
    const res = createRes();
    await handler(req, res);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: false,
      theme: "dark",
      showLangXP: false,
    });
  });

  it("passes showProgressBar=true as boolean true", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = { query: { user: "testuser", showProgressBar: "true" } };
    const res = createRes();
    await handler(req, res);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      theme: "dark",
      showLangXP: false,
    });
  });

  it("defaults showProgressBar to true if not set", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = { query: { user: "testuser" } };
    const res = createRes();
    await handler(req, res);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      theme: "dark",
      showLangXP: false,
    });
  });

  it("passes theme if provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = { query: { user: "testuser", theme: "light" } };
    const res = createRes();
    await handler(req, res);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      theme: "light",
      showLangXP: false,
    });
  });

  it("defaults theme to dark if not provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = { query: { user: "testuser" } };
    const res = createRes();
    await handler(req, res);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      theme: "dark",
      showLangXP: false,
    });
  });

  it("passes showLangXP if provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = { query: { user: "testuser", showLangXP: "true" } };
    const res = createRes();
    await handler(req, res);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      theme: "dark",
      showLangXP: true,
    });
  });

  it("returns 400 if theme is invalid", async () => {
    const req = { query: { user: "testuser", theme: "blue" } };
    const res = createRes();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      'Invalid theme. Only "light" or "dark" are supported.',
    );
  });
});
