export function chunkByWords(text: string, chunkSize: number = 100): string[] {
  // split text into words
  const words = text.split(/\s+/).filter(Boolean);

  //storing chubks in a array
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    const chunkWords = words.slice(i, i + chunkSize);
    chunks.push(chunkWords.join(" "));
  }

  return chunks;
}