import { OpenAIClient } from "@anvia/openai";
import "dotenv/config";

const client = new OpenAIClient({
  apiKey: process.env.OPENAI_API_KEY!,
  baseUrl: process.env.OPENAI_BASE_URL!,
});

export const chatModel = client.completionModel({
  modelId: process.env.OPENAI_MODEL!,
  api: "chat",
});
