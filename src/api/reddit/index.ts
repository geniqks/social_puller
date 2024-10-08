import { Server } from "@api/server";
import { IocContainer } from "src/containers/inversify.container";

const fastify = IocContainer.container.get(Server);

fastify.fastify.get("/", (request, reply) => {
  reply.send("Hello World");
});
