# CatHealth AI

Asisten konsultasi awal kesehatan kucing dengan Anvia Studio dan pencarian Qdrant.

## Struktur

```text
src/main.ts                  Menjalankan Studio di 127.0.0.1:4021
src/lib/model.ts             Model chat dan provider OpenAI-compatible
src/lib/agent.ts             Menghubungkan model, prompt, dan tool
src/lib/prompt.ts            Instruksi asisten
src/tools/search_knowledge.ts Tool cari_penyakit
src/rag/embedding.ts         Model embedding
src/rag/store.ts             Koneksi dan collection Qdrant
src/rag/ocr.ts               Script OCR PDF
src/rag/ingest.ts            Script memasukkan dokumen ke Qdrant
```

Alur chat: `main → agent → model + prompt + cari_penyakit`.
Alur pencarian: `cari_penyakit → embedding → Qdrant`.

## Menjalankan

Jalankan `pnpm install`, isi `.env`, lalu `pnpm dev`.
Gunakan `pnpm typecheck` untuk memeriksa TypeScript.

Variabel `.env`:

- `OPENAI_API_KEY`, `OPENAI_BASE_URL`: provider chat.
- `OPENAI_MODEL`: ID model chat; default `ag/gemini-3.8-flash-high`.
- `SUMOPOD_API_KEY`, `SUMOPOD_BASE_URL`: provider embedding `text-embedding-3-small`.
- `QDRANT_URL`, `QDRANT_API_KEY`: koneksi Qdrant, collection `penyakit`.
- `LLAMA_CLOUD_API_KEY`: diperlukan hanya untuk OCR.

Startup hanya menjalankan asisten. OCR dan ingest dijalankan terpisah.
Folder `src/data` sudah dihapus. Untuk memakai pipeline lagi, sediakan
`src/data/penyakit.pdf`, jalankan `pnpm ocr`, lalu `pnpm ingest`.
OCR hanya menghasilkan `src/data/penyakit-pages.json` berisi nomor halaman dan teks Markdown.
Pencarian menggunakan data yang sudah tersedia di Qdrant.
