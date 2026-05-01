import {FastifyInstance} from "fastify";
import { fileUploadController } from "../controller/chunkDownloable.controller";
import { apiChunkController } from "../controller/chunkingapi.controller";
import { chunkByMessageController } from "../controller/chunkByMessage.controller";

export default function fileRoutes(app: FastifyInstance){

    app.post("/upload",{
        handler: fileUploadController
    })

    app.post("/chunk/api",{
        handler: apiChunkController
    })
    app.post("/chunk/message/api",{
        handler: chunkByMessageController
    })
}