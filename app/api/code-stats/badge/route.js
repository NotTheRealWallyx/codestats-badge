import { NextResponse } from "next/server";
import { getCodeStatsSVG } from "@/app/lib/codeStatsService.js";
import { validateRequest } from "@/app/lib/utils.js";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("user");
    const limit = searchParams.get("limit");
    const showProgressBar = searchParams.get("showProgressBar");
    const theme = searchParams.get("theme") || "dark";
    const showLangXP = searchParams.get("showLangXP");
    const compact = searchParams.get("compact");

    const validation = validateRequest({ username, theme });
    if (!validation.valid) {
        return new NextResponse(validation.message, { status: validation.status });
    }

    try {
        const svg = await getCodeStatsSVG(username, {
            limit,
            showProgressBar: showProgressBar !== "false",
            theme,
            showLangXP: showLangXP === "true",
            compact: compact === "true",
        });
        return new NextResponse(svg, {
            status: 200,
            headers: {
                "Content-Type": "image/svg+xml",
                "Content-Disposition": 'inline; filename="badge.svg"',
                "X-Content-Type-Options": "nosniff",
                "Cache-Control": "s-maxage=3600",
            },
        });
    } catch {
        return new NextResponse("Error fetching user data from Code::Stats", {
            status: 500,
        });
    }
}
