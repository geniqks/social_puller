import { RedditDriver } from "@drivers/reddit.driver";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { StatusCodes } from "http-status-codes";
import { IocContainer } from "src/containers/inversify.container";
type CallbackQuery = FastifyRequest<{
  Querystring: {
    code: string;
  };
}>;

export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  const redditDriver = IocContainer.container.get(RedditDriver);
  fastify.get("/community", async function (request, reply) {
    return "this is an example";
  });

  fastify.get(
    "/auth",
    async function (_request: FastifyRequest, reply: FastifyReply) {
      const authUrl = await redditDriver.authorize();
      reply.redirect(authUrl);
    }
  );

  fastify.get(
    "/auth/callback",
    async function (request: CallbackQuery, reply: FastifyReply) {
      const { code } = request.query;
      const hasBeenAuthorized = await redditDriver.callbackHandler(code);

      if (hasBeenAuthorized) {
        reply.code(StatusCodes.OK)
        reply.send({ message: "Authorized" })
      } else {
        reply.code(StatusCodes.UNAUTHORIZED)
        reply.send({ message: "Unauthorized" })
      }
    }
  );
}
