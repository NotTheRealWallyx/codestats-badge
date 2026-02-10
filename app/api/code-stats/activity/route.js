import { getDailyExperience } from "@/app/lib/codeStatsService";
import { generateActivitySVG } from "@/app/lib/svg";

export async function GET(req) {
    const url = new URL(req.url);
    const user = url.searchParams.get("user");
    const theme = url.searchParams.get("theme") || "light";

    if (!user) {
        return new Response("Missing ?user=username", { status: 400 });
    }

    try {
        // Fetch daily experience data
        const dailyExperience = await getDailyExperience(user);

        // Generate the activity SVG
        const svg = generateActivitySVG(dailyExperience, theme);

        return new Response(svg, {
            status: 200,
            headers: {
                "Content-Type": "image/svg+xml",
                "Content-Disposition": "inline; filename=activity.svg",
                "X-Content-Type-Options": "nosniff",
                "Cache-Control": "s-maxage=3600",
            },
        });
    } catch (error) {
        console.error(error);
        return new Response("Error fetching user data from Code::Stats", { status: 500 });
    }
}