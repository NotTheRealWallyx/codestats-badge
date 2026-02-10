import { NextResponse } from "next/server";
import { getDailyExperience } from "@/app/lib/codeStatsService";
import { generateActivitySVG } from "@/app/lib/svg";
import { validateRequest } from "@/app/lib/utils.js";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("user");
    const theme = searchParams.get("theme") || "dark";

    const validation = validateRequest({ username, theme });
    if (!validation.valid) {
        return new NextResponse(validation.message, { status: validation.status });
    }


    try {
        const dailyExperience = await getDailyExperience(username);
        const svg = generateActivitySVG(dailyExperience, theme);

        return new NextResponse(svg, {
            status: 200,
            headers: {
                "Content-Type": "image/svg+xml",
                "Content-Disposition": "inline; filename=activity.svg",
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