import { readFile } from "node:fs/promises";
import { ingestVectorDocuments } from "@anvia/core/vector-store";
import { embeddingModel } from "./embedding";
import { qdrantClient, store } from "./store";

try {
  const pages: { page: number; text: string }[] = JSON.parse(
    await readFile("src/data/penyakit-pages.json", "utf8"),
  );

  await store.ensure();
  // Anvia filters by document ID when replacing previously ingested chunks.
  await qdrantClient.createPayloadIndex(store.options.collectionName, {
    field_name: "__anvia_document_id",
    field_schema: "keyword",
    wait: true,
  });

  const pageDocuments = pages.map((page) => ({
    id: `penyakit-page-${page.page}`,
    text: page.text,
    metadata: {
      source: "penyakit.pdf",
      title: "Penyakit Kucing",
      page: page.page,
      version: 1,
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
