import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string });

export async function POST(req: NextRequest) {
    try {
        const { conditions } = await req.json();

        const systemInstruction = `You are a recipe generator inside a health app called Dietary. Generate one healthy recipe suited to someone with these conditions: ${conditions?.join(", ") || "general wellness"}.
Respond with ONLY valid JSON, no markdown formatting, no code fences, no extra text. Use exactly this shape:
{
  "title": "Recipe Name",
  "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3"],
  "steps": ["step 1", "step 2", "step 3"]
}
Keep it to 4-6 ingredients and 3-4 steps. Make it genuinely appropriate for the stated conditions (e.g. low sodium for hypertension, low glycemic index for diabetes).`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: "Generate a recipe for me." },
            ],
        });

        const raw = completion.choices[0]?.message?.content || "";
        const cleaned = raw.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        return NextResponse.json(parsed);
    } catch (error) {
        console.error("Groq recipe error:", error);
        return NextResponse.json(
            { error: "AI is temporarily unavailable. Please try again in a moment." },
            { status: 503 }
        );
    }
}