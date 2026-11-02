import { createReadStream } from "node:fs";
import { writeFile } from "node:fs/promises";
import LlamaCloud from "@llamaindex/llama-cloud";
import "dotenv/config";

const client = new LlamaCloud({ apiKey: process.env.LLAMA_CLOUD_API_KEY! });

const result = await client.parsing.parse({
  upload_file: createReadStream("src/data/penyakit.pdf"),
  tier: "cost_effective",
  version: "latest",
  expand: ["markdown"],
  output_options: { markdown: { tables: { output_tables_as_markdown: true } } },
});

const pages = (result.markdown?.pages ?? []).filter((page) => page.success);
const pageList = pages.map((page) => ({
  page: page.page_number,
  text: page.markdown,
}));
await writeFile("src/data/penyakit-pages.json", JSON.stringify(pageList, null, 2));
