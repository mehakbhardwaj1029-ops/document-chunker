import { Chunk } from "../types/chunk";

export function generateTxt(chunks: Chunk[]){

    const header = `TOTAL CHUNKS: ${chunks.length}\n\n`;

    const body = chunks
        .map((chunk) => {
        return `----- CHUNK ${chunk.order} -----
    Words: ${chunk.wordCount}
    -------------------
    ${chunk.content}
    `;
        })
        .join("\n");

  return header + body;
}