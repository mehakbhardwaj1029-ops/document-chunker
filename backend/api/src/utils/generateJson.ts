import { Chunk } from "../types/chunk";

export function generateJson(chunks: Chunk[]) {

  return {
    totalChunks: chunks.length,
    generatedAt: new Date(),
    chunks,
  };
}