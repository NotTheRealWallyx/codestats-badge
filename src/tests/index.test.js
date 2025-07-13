import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../codeStatsService.js");
vi.mock("../utils.js", () => ({
  validateRequest: vi.fn(() => ({ valid: true })),
}));

import request from "supertest";
import * as codeStatsService from "../codeStatsService.js";
import app from "../index.js";

describe("/api/code-stats endpoint", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return SVG with 200 for valid request", async () => {
    codeStatsService.getCodeStatsSVG.mockResolvedValue("<svg></svg>");
    const res = await request(app).get("/api/code-stats?user=testuser");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("image/svg+xml");
    const svgString = res.text || res.body?.toString?.();
    expect(svgString).toContain("<svg");
  });

  it("should return error if validateRequest fails", async () => {
    const { validateRequest } = await import("../utils.js");
    validateRequest.mockReturnValue({
      valid: false,
      status: 400,
      message: "Invalid",
    });
    const res = await request(app).get("/api/code-stats?user=");
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid");
  });

  it("should return 500 if getCodeStatsSVG throws", async () => {
    // Make sure validateRequest returns valid: true
    const { validateRequest } = await import("../utils.js");
    validateRequest.mockReturnValue({ valid: true });
    codeStatsService.getCodeStatsSVG.mockRejectedValue(new Error("fail"));
    const res = await request(app).get("/api/code-stats?user=testuser");
    expect(res.status).toBe(500);
    expect(res.text).toBe("Error fetching user data from Code::Stats");
  });
});
