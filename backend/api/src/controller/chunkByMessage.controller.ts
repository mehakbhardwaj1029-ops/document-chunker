import { FastifyRequest,FastifyReply } from "fastify";
import { chunkByMessageService } from "../service/chunkByMessage.service";
import crypto from "crypto";

export async function chunkByMessageController(
    request: FastifyRequest,
    reply: FastifyReply
){
    try
    {
        const file = await request.file();
    if(!file){
        return reply.status(400).send({message: "No file found"});
    }

    const buffer = await file.toBuffer();

    const text = buffer.toString("utf-8");

    const fileHash = crypto.createHash("sha256").update(buffer).digest("hex");

    const tokenCount = 1000;

    const response = await chunkByMessageService(text, tokenCount);

    return reply.status(200).send({
        ...response,
        fileHash
    });
}
catch(error: any){

    return reply.status(500).send({message: "Internal server error"});
}

}