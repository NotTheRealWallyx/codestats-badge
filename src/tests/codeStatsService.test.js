import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCodeStatsSVG } from "../codeStatsService.js";
import axios from "axios";

vi.mock("axios");

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
	});

	it("should throw if username is missing", async () => {
		await expect(getCodeStatsSVG()).rejects.toThrow();
	});

	it("should return SVG for a valid user", async () => {
		axios.get.mockResolvedValueOnce({ data: mockUserData });
		const svg = await getCodeStatsSVG("testuser");
		expect(svg).toContain("<svg");
		expect(svg).toContain("testuser");
		expect(svg).toContain("Total XP: 123,456");
	});

	it("should limit the number of languages in the SVG", async () => {
		axios.get.mockResolvedValueOnce({ data: mockUserData });
		const svg = await getCodeStatsSVG("testuser", { limit: 2 });
		const langLines = svg.match(/class="lang-line"/g) || [];
		expect(langLines.length).toBe(2);
	});

	it("should throw on API error", async () => {
		axios.get.mockRejectedValueOnce(new Error("API error"));
		await expect(getCodeStatsSVG("testuser")).rejects.toThrow();
	});
});
