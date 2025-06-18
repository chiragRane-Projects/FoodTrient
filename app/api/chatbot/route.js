import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { message } = await req.json();
        console.log("Chatbot request message:", message);

        if (!message || typeof message !== "string") {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
        }

        const prompt = `
You are a professional nutritionist. Based on the user's question about food or health, give clear, practical, and accurate advice.
Question: "${message}"
`;
const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );
  

        const data = await geminiRes.json();
        console.log("Gemini API response:", JSON.stringify(data, null, 2));

        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!answer) {
            return NextResponse.json({ error: "No answer from Gemini" }, { status: 500 });
        }

        return NextResponse.json({ answer }, { status: 200 });

    } catch (err) {
        console.error("Chatbot Error:", err);
        return NextResponse.json({ error: err.message || "Server Error" }, { status: 500 });
    }
}
