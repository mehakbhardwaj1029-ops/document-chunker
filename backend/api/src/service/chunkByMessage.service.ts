import crypto from "crypto";

export interface Chunk {
    chunkId: string;
    order: number;
    wordCount: number;
    tokenCount: number;
    content: string;
}

export async function chunkByMessageService(
    text: string,
    tokenLimit: number = 1000
): Promise<Chunk[]> {

    // Regex to detect timestamp
    // 22/01/26, 3:52 pm -
  

   const messageStartRegex =
    /(\d{2}\/\d{2}\/\d{2},\s\d{1,2}:\d{2}\s(?:am|pm)\s-\s.*?)(?=\d{2}\/\d{2}\/\d{2},\s\d{1,2}:\d{2}\s(?:am|pm)\s-|$)/gis;

    const rawMessages = text.match(messageStartRegex)?.map(
    msg => msg.trim()
    ) || [];

    const chunks: Chunk[] = [];

    let currentChunkMessages: string[] = [];
    let currentTokenCount = 0;
    let order = 1;

    for (const message of rawMessages) {

        // Simple token estimation
        // Later you can replace with tiktoken
        const estimatedTokens = estimateTokens(message);

        // Edge case:
        // single message itself exceeds token limit
        if (estimatedTokens > tokenLimit) {

            // save previous chunk first
            if (currentChunkMessages.length > 0) {

                const chunkContent = currentChunkMessages.join("\n");

                chunks.push(createChunk(
                    chunkContent,
                    order++,
                    currentTokenCount
                ));

                currentChunkMessages = [];
                currentTokenCount = 0;
            }

            // store huge message separately
            chunks.push(createChunk(
                message,
                order++,
                estimatedTokens
            ));

            continue;
        }

        // Check if adding message exceeds limit
        if (currentTokenCount + estimatedTokens > tokenLimit) {

            // finalize current chunk
            const chunkContent = currentChunkMessages.join("\n");

            chunks.push(createChunk(
                chunkContent,
                order++,
                currentTokenCount
            ));

            // start new chunk
            currentChunkMessages = [];
            currentTokenCount = 0;
        }

        // add message safely
        currentChunkMessages.push(message);
        currentTokenCount += estimatedTokens;
    }

    // save remaining messages
    if (currentChunkMessages.length > 0) {

        const chunkContent = currentChunkMessages.join("\n");

        chunks.push(createChunk(
            chunkContent,
            order++,
            currentTokenCount
        ));
    }

    return chunks;
}

function estimateTokens(text: string): number {

    // rough approximation:
    // 1 token ≈ 0.75 words
    // OR 4 chars per token

    return Math.ceil(text.split(/\s+/).length * 1.3);
}

function createChunk(
    content: string,
    order: number,
    tokenCount: number
): Chunk {

    return {
        chunkId: crypto.randomUUID(),
        order,
        wordCount: content.split(/\s+/).length,
        tokenCount,
        content
    };
}