import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string });

export async function POST(req: NextRequest) {
    try {
        const { conditions, calories, targetCalories, water, targetWater, glucose } = await req.json();

        const systemInstruction = `You are a health insights generator inside a health app called Dietary. The user's conditions are: ${conditions?.join(", ") || "general wellness"}.

Today's tracked data:
- Calories: ${calories} of ${targetCalories} kcal target
- Water: ${water}ml of ${targetWater}ml target
- Recent blood glucose readings (mg/dL): ${glucose?.map((g: { label: string; value: number }) => `${g.label}: ${g.value}`).join(", ") || "none logged"}

Write ONE short, encouraging, specific insight (2-3 sentences max) based on this real data and their condition. Be concrete — reference actual numbers where relevant. Do not diagnose or recommend medication changes. Respond with plain text only, no JSON, no markdown.`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: "Give me my health insight for today." },
            ],
        });

        const text = completion.choices[0]?.message?.content || "Keep tracking your meals and water intake for personalized insights.";

        return NextResponse.json({ insight: text });
    } catch (error) {
        console.error("Groq insights error:", error);
        return NextResponse.json(
            { error: "AI is temporarily unavailable. Please try again in a moment." },
            { status: 503 }
        );
    }
}