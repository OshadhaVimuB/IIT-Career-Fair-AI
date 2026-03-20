import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function callClaude(systemPrompt: string, userPrompt: string) {
  const msg = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
      // Give Claude a trailing hint to output pure JSON
      {
        role: "assistant",
        content: "{"
      }
    ],
  });

  // Since we forced the output to start with `{`, we need to prepend it
  // to the response string to maintain valid JSON consistency.
  const contentBlock = msg.content.find((block) => block.type === "text");
  const extractedText = contentBlock?.type === "text" ? contentBlock.text : "";
  
  return "{" + extractedText;
}
