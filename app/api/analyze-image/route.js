import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }
        const buffer = await file.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        const prompt = `
        Give me a detailed nutrition analysis, disease risk, and healthy alternatives for the food item in this image.
        `

        const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        inline_data: {
                            mime_type: "image/jpeg",
                            data: base64Image
                        }
                    }, { text: prompt }]
                }]
            })
        });

        const data = await geminiRes.json();

        return NextResponse.json({ result: data }, { status: 200 });
    } catch (error) {
        console.log("Gemini Error:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}