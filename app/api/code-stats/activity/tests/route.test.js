import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../../lib/codeStatsService", () => ({
    getDailyExperience: vi.fn(() => [
        { date: "2026-02-01", xp: 100 },
        { date: "2026-02-02", xp: 200 },
        { date: "2026-02-03", xp: 50 },
    ]),
}));

vi.mock("../../../../lib/svg", () => ({
    generateActivitySVG: vi.fn(() => "<svg>mocked</svg>"),
}));

import { getDailyExperience } from "@/app/lib/codeStatsService";
import { generateActivitySVG } from "@/app/lib/svg";
import { GET } from "../route.js";

function createRequest(url) {
    return { url };
}

describe("GET /api/code-stats/activity", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns 400 if user is missing", async () => {
        const req = { url: "http://localhost/api/code-stats/activity" };
        const res = await GET(req);
        expect(res.status).toBe(400);
        const body = await res.text();
        expect(body).toBe("Missing ?user=username");
    });

    it("returns SVG if user is provided", async () => {
        const req = { url: "http://localhost/api/code-stats/activity?user=testuser" };
        const res = await GET(req);

        expect(getDailyExperience).toHaveBeenCalledWith("testuser");
        expect(generateActivitySVG).toHaveBeenCalledWith(
            [
                { date: "2026-02-01", xp: 100 },
                { date: "2026-02-02", xp: 200 },
                { date: "2026-02-03", xp: 50 },
            ],
            "dark"
        );

        expect(res.status).toBe(200);
        expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
        const body = await res.text();
        expect(body).toBe("<svg>mocked</svg>");
    });

    it("returns SVG with light theme if theme is set to light", async () => {
        const req = { url: "http://localhost/api/code-stats/activity?user=testuser&theme=light" };
        const res = await GET(req);

        expect(getDailyExperience).toHaveBeenCalledWith("testuser");
        expect(generateActivitySVG).toHaveBeenCalledWith(
            [
                { date: "2026-02-01", xp: 100 },
                { date: "2026-02-02", xp: 200 },
                { date: "2026-02-03", xp: 50 },
            ],
            "light"
        );

        expect(res.status).toBe(200);
        expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
        const body = await res.text();
        expect(body).toBe("<svg>mocked</svg>");
    });

    it("returns 500 on error", async () => {
        getDailyExperience.mockRejectedValue(new Error("fail"));
        const req = createRequest("http://localhost/api/code-stats/activity?user=testuser");
        const res = await GET(req);
        expect(res.status).toBe(500);
        const body = await res.text();
        expect(body).toBe("Error fetching user data from Code::Stats");
    });
});