import { OpenAIClient } from "@anvia/openai";
import "dotenv/config"

const client = new OpenAIClient({
    apiKey: process.env.OPENAI_API_KEY!,
    baseUrl: process.env.OPENAI_BASE_URL!,
})

export const model = client.completionModel({
    modelId: "ag/gemini-3.8-flash-high",
    api: "chat"
})