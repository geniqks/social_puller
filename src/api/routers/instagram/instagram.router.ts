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
      const response = await brightDataController.getInstagramComments(urlsArray);
      reply.send(response);
    } catch (error) {
      reply.status(500).send(error);
    }
  })

  // TODO: ajouter un webhook pour chaque dataset
  fastify.post("/comments/webhook", async (request: FastifyRequest, reply: FastifyReply) => {
    const { body } = request;
    console.log(body);
    reply.send({ message: "ok" });
  })

  fastify.get("/posts", async (request: BridghtDataQueryType, reply: FastifyReply) => {
    const { urls } = request.query;
    const urlsArray = urls.split(",");

    try {
      const response = await brightDataController.getInstagramPosts(urlsArray);
      reply.send(response);
    } catch (error) {
      reply.status(500).send(error);
    }
  })

  fastify.post("/posts/webhook", async (request: FastifyRequest, reply: FastifyReply) => {
    const { body } = request;
    console.log(body);
    reply.send({ message: "ok" });
  })


  fastify.get("/profiles", async (request: BridghtDataQueryType, reply: FastifyReply) => {
    const { urls } = request.query;
    const urlsArray = urls.split(",");

    try {
      const response = await brightDataController.getInstagramProfiles(urlsArray);
      reply.send(response);
    } catch (error) {
      reply.status(500).send(error);
    }
  })

  fastify.post("/profiles/webhook", async (request: FastifyRequest, reply: FastifyReply) => {
    const { body } = request;
    console.log(body);
    reply.send({ message: "ok" });
  })

  fastify.get("/reels", async (request: BridghtDataQueryType, reply: FastifyReply) => {
    const { urls } = request.query;
    const urlsArray = urls.split(",");

    try {
      const response = await brightDataController.getInstagramReels(urlsArray);
      reply.send(response);
    } catch (error) {
      reply.status(500).send(error);
    }
  })

  fastify.post("/reels/webhook", async (request: FastifyRequest, reply: FastifyReply) => {
    const { body } = request;
    console.log(body);
    reply.send({ message: "ok" });
  })
  // #endregion
}
