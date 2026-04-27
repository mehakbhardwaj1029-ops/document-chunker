import Fastify from 'fastify';
import multipart from "@fastify/multipart";
import fileRoutes from './routes/file.routes';
import cors from '@fastify/cors';

const app = Fastify({logger: true});

  const API_URL = process.env.CORS_ORIGIN;


app.register(cors, {
  origin: API_URL,
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
    const port = Number(process.env.PORT) || 3000;

    await app.listen({
      port,
      host: "0.0.0.0",
    });

    console.log(`Server running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();