import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "No valid message provided" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content: `
You are a legal information assistant specializing in Indian law.

Instructions:
- Answer only the user's current question.
- Do not rely on or respond to previous matters unless explicitly mentioned.
- Base your answer on Indian jurisdiction.
- Provide general legal information, not personalized legal advice.
- Keep the answer brief, clear, and easy to understand.
- Mention relevant Indian laws or sections when you are confident they apply.
- Do not invent laws, sections, judgments, or legal procedures.
- If the answer depends on specific facts, clearly mention that.
- Do not unnecessarily repeat the user's question.
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return Response.json(
        { error: "No response generated" },
        { status: 500 }
      );
    }

    return Response.json({ reply });
  } catch (error) {
    console.error("OpenRouter error:", error);

    return Response.json(
      {
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
