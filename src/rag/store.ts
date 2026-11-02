import "dotenv/config";
import type { TextDocument } from "@anvia/core/documents";
import { QdrantVectorClient } from "@anvia/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";

export const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
});

const qdrant = new QdrantVectorClient({ client: qdrantClient });

export const store = qdrant.vectorStore<TextDocument>({
  collectionName: "penyakit",
  dimensions: 1536,
  metric: "cosine",
});
