import Groq from "groq-sdk";

// Using groq-sdk as an OpenAI-compatible client to hit Gemini's OpenAI endpoint
export const gemini = new Groq({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function callGemini(systemPrompt: string, userPrompt: string, jsonMode = true) {
  const completion = await gemini.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    model: "gemini-2.0-flash",
    response_format: jsonMode ? { type: "json_object" } : undefined,
  });

  return completion.choices[0]?.message?.content || "";
}
