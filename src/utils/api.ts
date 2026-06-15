import type { GroqResponse } from "../types.js";

const API_KEY =
  import.meta.env.VITE_GROQ_API_KEY;

export const askGroq = async (
  prompt: string
): Promise<string> => {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data: GroqResponse =
    await response.json();

  return (
    data?.choices?.[0]?.message
      ?.content ||
    "No response received."
  );
};