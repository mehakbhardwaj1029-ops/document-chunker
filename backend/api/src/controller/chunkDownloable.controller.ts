import { FastifyRequest,FastifyReply } from "fastify";
import { chunkByWords } from "../utils/chunker";
import { generateTxt } from '../utils/generateTxt';
import { generateJson } from "../utils/generateJson";
import archiver from "archiver";


export async function fileUploadController(
    request: FastifyRequest,
    reply: FastifyReply
){
    const file = await request.file();
    if(!file){
            return reply.status(400).send({ error: "No file uploaded" });
    }

    const { filename } = file;
    const baseName = filename.replace(/\.[^/.]+$/, "");

    //convert file stream to string
    const buffer =  await file.toBuffer();
    const text = buffer.toString("utf-8");

    const chunks = chunkByWords(text, 100);

    const txt = generateTxt(chunks);
    const json = JSON.stringify(
    generateJson(chunks),
    null,
    2
    );

    reply.raw.writeHead(200, {
        "Content-Type": "application/zip",

        "Content-Disposition":
             `attachment; filename="${baseName}-exports.zip"`,

        "Access-Control-Allow-Origin":
    
                
                "https://document-chunker.netlify.app"
        
     });
     
        // create zip archive
        const archive = archiver("zip", {
            zlib: { level: 9 },
        });

        // pipe zip to response
        archive.pipe(reply.raw);

        // add files into zip
        archive.append(txt, {
            name: `${baseName}-chunks.txt`,
        });

        archive.append(json, {
            name: `${baseName}-chunks.json`,
        });

        // finalize zip
        await archive.finalize();

}