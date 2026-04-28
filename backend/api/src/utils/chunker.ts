import {Chunk} from "../types/chunk"

export function chunkByWords(text: string, chunkSize: number = 100): Chunk[] {
  // split text into words
  const words = text.split(/\s+/);

  //storing chubks in a array
  const chunks: Chunk[] = [];

  let order = 1;

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunkWords = words.slice(i, i + chunkSize);
    const content = chunkWords.join(" ");
    chunks.push({
        chunkId: `chunk-${order}`,
        order,
        wordCount: chunkWords.length,
        content,
      }
    );
    order++;
  }

  return chunks;
}