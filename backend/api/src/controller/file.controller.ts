import { FastifyRequest,FastifyReply } from "fastify";
import { chunkByWords } from "../utils/chunker";


export async function fileUploadController(
    request: FastifyRequest,
    reply: FastifyReply
){
    const file = await request.file();
    if(!file){
            return reply.status(400).send({ error: "No file uploaded" });
    }

    const { filename, mimetype } = file;

    //convert file stream to string
    const buffer =  await file.toBuffer();
    const text = buffer.toString("utf-8");

    const chunks = chunkByWords(text, 100);

    const header = `TOTAL CHUNKS: ${chunks.length}\n\n`;

    const fileContent = chunks
    .map((chunk, index) => {
    const wordCount = chunk.split(/\s+/).length;

        return `----- CHUNK ${index + 1} -----
        Words: ${wordCount}
        -------------------
        ${chunk}
        `;
        })
        .join("\n");

        const finalContent = header + fileContent;

        reply.header("Content-Type", "text/plain");
        reply.header(
        "Content-Disposition",
        `attachment; filename="${filename}-chunks.txt"`
        );

        return reply.send(finalContent);
        // sending response in json will not remove \n 

    // return {
    //     filename,
    //     mimetype,
    //     header,
    //     fileContent
    //     // totalChunks: chunks.length,
    //     // textPreview: chunks.slice(0,2),

    // }

}