import { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  fastify.get("/posts/:id", async function (request, reply) {
    return {
      message: "twitter posts",
    };
  });
}
