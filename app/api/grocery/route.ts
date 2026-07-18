import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string });

export async function POST(req: NextRequest) {
    try {
        const { conditions, recipeTitle } = await req.json();

        const systemInstruction = `You are a grocery list generator inside a health app called Dietary. Generate a weekly grocery list suited to someone with these conditions: ${conditions?.join(", ") || "general wellness"}.
${recipeTitle ? `Their most recent AI-generated recipe was: "${recipeTitle}" — include ingredients that would support cooking similar meals.` : ""}
Respond with ONLY valid JSON, no markdown formatting, no code fences, no extra text. Use exactly this shape:
{
  "items": ["item 1", "item 2", "item 3"]
}
Include 8-12 items. Make choices genuinely appropriate for the stated conditions (e.g. low sodium for hypertension, low glycemic index for diabetes, kidney-friendly for kidney disease).`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: "Generate my grocery list." },
            ],
        });

        const raw = completion.choices[0]?.message?.content || "";
        const cleaned = raw.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        return NextResponse.json(parsed);
    } catch (error) {
        console.error("Groq grocery error:", error);
        return NextResponse.json(
            { error: "AI is temporarily unavailable. Please try again in a moment." },
            { status: 503 }
        );
    }
}