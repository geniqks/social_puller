import { FastifyInstance } from "fastify";

export function loadSchemas(fastify: FastifyInstance) {
  fastify.addSchema({
    $id: "brightDataUrlsQuerySchema",
    type: "object",
    properties: {
      urls: { type: "string" },
    },
    required: ["urls"],
  });
}
