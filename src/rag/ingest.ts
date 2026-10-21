import { readFile } from "node:fs/promises";
import { OpenAIClient } from "@anvia/openai";
import "dotenv/config";
import { QdrantVectorClient } from "@anvia/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { ingestVectorDocuments } from "@anvia/core/vector-store";
import type { TextDocument } from "@anvia/core/documents";

const sumopod = new OpenAIClient({
  apiKey: process.env.SUMOPOD_API_KEY!,
  baseUrl: process.env.SUMOPOD_BASE_URL!,
});

export const embeddingModel = sumopod.embeddingModel({
  modelId: "text-embedding-3-small",
});

const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
});
const qdrant = new QdrantVectorClient({ client: qdrantClient });
export const store = qdrant.vectorStore<TextDocument>({
  collectionName: "penyakit",
  dimensions: 1536,
  metric: "cosine",
});

try {
  await store.ensure();
  // Anvia filters by document ID when replacing previously ingested chunks.
  await qdrantClient.createPayloadIndex(store.options.collectionName, {
    field_name: "__anvia_document_id",
    field_schema: "keyword",
    wait: true,
  });

  const pages: { page: number; text: string }[] = JSON.parse(
    await readFile("src/data/penyakit-pages.json", "utf8"),
  );

  const pageDocuments = pages.map((page) => ({
    id: `penyakit-page-${page.page}`,
    text: page.text,
    metadata: {
      source: "penyakit.pdf",
      title: "Penyakit Kucing",
      page: page.page,
      version: 2,
    },
  }));

  await ingestVectorDocuments({
    store,
    documents: pageDocuments,
    embeddingModel,
    chunking: { strategy: "none" },
  });
} catch (err) {
  console.error(err);
  process.exitCode = 1;
}
