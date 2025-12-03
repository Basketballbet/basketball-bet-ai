import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { message } = req.body;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are Ball AI, a basketball betting assistant.
Answer the user's query in a clear, concise way with tips, advice, and reasoning.
User query: "${message}"
Respond naturally like a chat assistant.
`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.6
        });

        const reply = completion.choices[0].message.content;
        res.status(200).json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ reply: "Error generating response." });
    }
}
