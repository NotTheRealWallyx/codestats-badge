import { describe, it, expect } from "vitest";
import { validateTheme, validateRequest } from "../utils.js";

describe("validateTheme", () => {
	it('returns true for "light"', () => {
		expect(validateTheme("light")).toBe(true);
	});
	it('returns true for "dark"', () => {
		expect(validateTheme("dark")).toBe(true);
	});
	it("returns false for other values", () => {
		expect(validateTheme("blue")).toBe(false);
		expect(validateTheme("")).toBe(false);
		expect(validateTheme(undefined)).toBe(false);
	});
});

describe("validateRequest", () => {
	it("returns invalid if username is missing", () => {
		expect(validateRequest({ username: undefined, theme: "dark" })).toEqual({
			valid: false,
			status: 400,
			message: "Missing ?user=username",
		});
	});
	it("returns invalid if theme is invalid", () => {
		expect(validateRequest({ username: "foo", theme: "blue" })).toEqual({
			valid: false,
			status: 400,
			message: 'Invalid theme. Only "light" or "dark" are supported.',
		});
	});
	it("returns valid for correct input", () => {
		expect(validateRequest({ username: "foo", theme: "dark" })).toEqual({
			valid: true,
		});
		expect(validateRequest({ username: "foo", theme: "light" })).toEqual({
			valid: true,
		});
		expect(validateRequest({ username: "foo", theme: undefined })).toEqual({
			valid: true,
		});
	});
});
