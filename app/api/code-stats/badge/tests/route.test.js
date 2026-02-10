import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock getCodeStatsSVG and validateTheme before importing handler
vi.mock("../../../../lib/codeStatsService.js", () => ({
  getCodeStatsSVG: vi.fn(),
  validateTheme: vi.fn((theme) => theme === "light" || theme === "dark"),
}));

import { getCodeStatsSVG } from "../../../../lib/codeStatsService.js";
import { GET } from "../route.js";

function createRequest(url) {
  return { url };
}

describe("GET handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 if user is missing", async () => {
    const req = createRequest("http://localhost/api/code-stats/badge");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.text();
    expect(body).toBe("Missing ?user=username");
  });

  it("returns SVG if user is provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser&limit=2");
    const res = await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      limit: "2",
      showProgressBar: true,
      theme: "dark",
      showLangXP: false,
      compact: false,
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
    expect(res.headers.get("Content-Disposition")).toBe('inline; filename="badge.svg"');
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(res.headers.get("Cache-Control")).toBe("s-maxage=3600");
    const body = await res.text();
    expect(body).toBe("<svg>test</svg>");
  });

  it("returns 500 on error", async () => {
    getCodeStatsSVG.mockRejectedValue(new Error("fail"));
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser");
    const res = await GET(req);
    expect(res.status).toBe(500);
    const body = await res.text();
    expect(body).toBe("Error fetching user data from Code::Stats");
  });

  it("passes showProgressBar=false as boolean false", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser&showProgressBar=false");
    await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: false,
      limit: null,
      theme: "dark",
      showLangXP: false,
      compact: false,
    });
  });

  it("passes showProgressBar=true as boolean true", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser&showProgressBar=true");
    await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      limit: null,
      theme: "dark",
      showLangXP: false,
      compact: false,
    });
  });

  it("defaults showProgressBar to true if not set", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser");
    await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      limit: null,
      theme: "dark",
      showLangXP: false,
      compact: false,
    });
  });

  it("defaults compact to false if not set", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser");
    await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      limit: null,
      theme: "dark",
      showLangXP: false,
      compact: false,
    });
  });

  it("passes theme if provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser&theme=light");
    await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      limit: null,
      theme: "light",
      showLangXP: false,
      compact: false,
    });
  });

  it("defaults theme to dark if not provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser");
    await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      limit: null,
      theme: "dark",
      showLangXP: false,
      compact: false,
    });
  });

  it("passes showLangXP if provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser&showLangXP=true");
    await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      limit: null,
      theme: "dark",
      showLangXP: true,
      compact: false,
    });
  });

  it("passes compact if provided", async () => {
    getCodeStatsSVG.mockResolvedValue("<svg>test</svg>");
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser&compact=true");
    await GET(req);
    expect(getCodeStatsSVG).toHaveBeenCalledWith("testuser", {
      showProgressBar: true,
      limit: null,
      theme: "dark",
      showLangXP: false,
      compact: true,
    });
  });

  it("returns 400 if theme is invalid", async () => {
    const req = createRequest("http://localhost/api/code-stats/badge?user=testuser&theme=blue");
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.text();
    expect(body).toBe('Invalid theme. Only "light" or "dark" are supported.');
  });
});
