import Fastify from 'fastify';
import multipart from "@fastify/multipart";
import fileRoutes from './routes/file.routes';
import cors from '@fastify/cors';

const app = Fastify({logger: true});

app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
});
app.register(multipart);
app.register(fileRoutes, {prefix: "/chat"});


app.get("/health",async ()=>{
     return {status: "OK"}
})

app.get("/",async ()=>{
    return "server running";
});

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close()
    process.exit(0)
  })
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();