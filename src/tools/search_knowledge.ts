import { createVectorSearchTool } from "@anvia/core/vector-store";
import type { AnyTool } from "@anvia/core";
import { embeddingModel, store } from "../rag/ingest";

export const searchPenyakit: AnyTool = createVectorSearchTool({
  name: "cari_penyakit",
  description:
    "Search the penyakit kucing documents. Returns the most relevant passages with their page and section.",
  store,
  model: embeddingModel,
  topK: 5,
});
