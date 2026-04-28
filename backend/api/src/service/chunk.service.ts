import { chunkByWords } from "../utils/chunker";
import { generateJson } from "../utils/generateJson";
import { Chunk } from "../types/chunk";

export async function processDocument(
  text: string,
  chunkSize = 100
) {

  const chunks: Chunk[] =
    chunkByWords(text, chunkSize);

  return generateJson(chunks);
}