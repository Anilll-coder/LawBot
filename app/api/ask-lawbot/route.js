import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "No valid message provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is missing");
      return Response.json(
        { error: "Server API key is not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
    });

    const completion = await openai.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: `
You are a legal information assistant specializing in Indian law.

- Answer only the user's current question.
- Base answers on Indian jurisdiction.
- Give general legal information, not personalized legal advice.
- Keep answers brief and clear.
- Do not invent laws, sections, judgments, or procedures.
- Mention relevant Indian laws or sections only when confident.
- If the answer depends on specific facts, state that clearly.
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content;

    return Response.json({
      reply: reply || "Unable to generate a response.",
    });
  } catch (error) {
    console.error("OpenRouter error:", error);

    return Response.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
