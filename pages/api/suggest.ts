import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextApiRequest, NextApiResponse } from 'next';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const systemPrompt = `You are a helpful task manager assistant. 
    The user will give you a goal or a project. 
    You need to break it down into actionable tasks.
    Return ONLY a JSON array of strings, where each string is a task title.
    Example input: "Plan a birthday party"
    Example output: ["Choose a date and time", "Create a guest list", "Send invitations", "Order cake", "Buy decorations"]
    Do not include any markdown formatting or explanations. Just the JSON array.`;

        const result = await model.generateContent([systemPrompt, prompt]);
        const response = await result.response;
        const text = response.text();

        // Clean up the response in case it contains markdown code blocks
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        let tasks: string[] = [];
        try {
            tasks = JSON.parse(cleanedText);
        } catch (e) {
            console.error("Failed to parse AI response", text);
            return res.status(500).json({ error: "Failed to parse AI response" });
        }

        return res.status(200).json({ tasks });
    } catch (error) {
        console.error("AI API Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
