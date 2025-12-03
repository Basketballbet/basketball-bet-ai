import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { league, home_team, away_team, market_type, odds, model_prob } = req.body;
    const o = parseFloat(odds), p = parseFloat(model_prob) || 0.5;

    const impliedProb = 1/o;
    const ev = p*(o-1) - (1-p);
    const kelly = ev > 0 ? ev/(o-1) : 0;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
You are a basketball betting AI.
League: ${league}, Match: ${home_team} vs ${away_team}, Market: ${market_type}, Odds: ${odds}, Model Probability: ${model_prob}
Numeric Context: Implied Probability=${impliedProb.toFixed(2)}, EV=${ev.toFixed(2)}, Kelly=${kelly.toFixed(2)}
Return JSON: verdict (Good Value/Fair/Avoid), edge_percentage, reasons[3], risks[2], confidence (Low/Medium/High), explanation
`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5
    });

    const output = completion.choices[0].message.content;
    res.status(200).json(JSON.parse(output));
}
Add backend API for basketball bet evaluator
