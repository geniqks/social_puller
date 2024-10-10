import { BrightDataController } from "@api/controllers/brightdata/brightdata.controller";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest
} from "fastify";
import { IocContainer } from "src/containers/inversify.container";

type BridghtDataQueryType = FastifyRequest<{
  Querystring: {
    urls: string
  }
}>

/**
 * Because of the twitter API price, we will use it only to post on the bot account.
 */
export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  const brightDataController = IocContainer.container.get(BrightDataController);

  // #region BrightData
  // TODO: ajouter un callback_url qui sera trigger une fois le traitement terminé
  fastify.get("/comments", async (request: BridghtDataQueryType, reply: FastifyReply) => {
    const { urls } = request.query;
    const urlsArray = urls.split(",");

    // TODO: Voir pour ajouter la validation des urls fastify
    if (!urls) {
      reply.status(400).send({ error: "No urls provided" });
    }

    try {
      const comments = await brightDataController.getInstagramComments(urlsArray);
      reply.send(comments);
    } catch (error) {
      reply.status(500).send(error);
    }
  })
  // #endregion
}
