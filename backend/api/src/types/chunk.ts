export interface Chunk {
    chunkId: string;
    order: number;
    wordCount: number;
    content: string;
}

export interface ChunkResult {
    chunks: Chunk[];
    participants: string[];
}