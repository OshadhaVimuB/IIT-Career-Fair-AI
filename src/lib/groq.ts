import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function callGroq(systemPrompt: string, userPrompt: string, jsonMode = true) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    model: "llama-3.3-70b-versatile",
    response_format: jsonMode ? { type: "json_object" } : undefined,
  });

  return completion.choices[0]?.message?.content || "";
}
