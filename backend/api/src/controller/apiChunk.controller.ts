import {
  FastifyRequest,
  FastifyReply
} from "fastify";

import {
  processDocument
} from "../service/chunk.service";

export async function apiChunkController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const file = await request.file();

  if (!file) {
    return reply
      .status(400)
      .send({
        error: "No file uploaded"
      });
  }

  const buffer = await file.toBuffer();  //loads entire buffer file into ram

  const text = buffer.toString("utf-8");

  const result =
    await processDocument(text);

  return reply.send(result);
}