import { OpenAI } from "openai";

let openai: OpenAI | null = null;

export const getOpenAiClient = () => {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  return openai;
};
