import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY as string });

export async function POST(req: NextRequest) {
    try {
        const { message, conditions } = await req.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const systemInstruction = `You are a nutrition assistant inside a health app called Dietary. The user's known health conditions are: ${conditions?.join(", ") || "not specified"}. 
Give concrete, food-focused nutrition guidance relevant to these conditions. Keep answers short, practical, and specific to food and diet choices.
Always make clear you are not a substitute for professional medical advice, and encourage checking with a doctor or dietitian for anything serious or medication-related.
Do not diagnose. Do not recommend specific drug dosages or medication changes.`;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: message },
            ],
        });

        const text = completion.choices[0]?.message?.content || "I'm not sure how to respond to that.";

        return NextResponse.json({ reply: text });
    } catch (error) {
        console.error("Groq API error:", error);
        return NextResponse.json(
            { error: "AI is temporarily unavailable. Please try again in a moment." },
            { status: 503 }
        );
    }
}