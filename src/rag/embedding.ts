import "dotenv/config";
import { OpenAIClient } from "@anvia/openai";

const client = new OpenAIClient({
  apiKey: process.env.SUMOPOD_API_KEY!,
  baseUrl: process.env.SUMOPOD_BASE_URL!,
});

export const embeddingModel = client.embeddingModel({
  modelId: "text-embedding-3-small",
});
