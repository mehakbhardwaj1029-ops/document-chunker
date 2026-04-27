import {FastifyInstance} from "fastify";
import { fileUploadController } from "../controller/file.controller";

export default function fileRoutes(app: FastifyInstance){

    app.post("/upload",{
        handler: fileUploadController
    })
}