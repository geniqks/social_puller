import {
  FastifyInstance,
  FastifyPluginOptions
} from "fastify";

/**
 * Because of the twitter API price, we will use it only to post on the bot account.
 */
export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> { }
