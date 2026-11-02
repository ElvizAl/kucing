import { createVectorSearchTool } from "@anvia/core/vector-store";
import type { AnyTool } from "@anvia/core";
import { embeddingModel } from "../rag/embedding";
import { store } from "../rag/store";

export const searchPenyakit: AnyTool = createVectorSearchTool({
  name: "cari_penyakit",
  description:
    "Search the penyakit kucing documents. Returns the most relevant passages with their page and section.",
  store,
  model: embeddingModel,
  minScore: 0.72,
  topK: 5,
});
