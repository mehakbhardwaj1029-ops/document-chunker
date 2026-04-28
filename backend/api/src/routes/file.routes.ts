import {FastifyInstance} from "fastify";
import { fileUploadController } from "../controller/chunkDownloable.controller";
import { apiChunkController } from "../controller/chunkingapi.controller";

export default function fileRoutes(app: FastifyInstance){

    app.post("/upload",{
        handler: fileUploadController
    })

    app.post("/chunk/api",{
        handler: apiChunkController
    })
}