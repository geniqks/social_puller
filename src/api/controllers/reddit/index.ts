import { FastifyPluginOptions } from "fastify";

export default async function (
  fastify: any,
  _opts: FastifyPluginOptions
): Promise<void> {
  console.log("cc");

  fastify.get("/tt", async function (request, reply) {
    console.log("slaut");
    return "this is an example";
  });
}

console.log("reddit");
