import { BrightDataMonitorRepository } from "@repository/brightdata-monitor.repository";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { StatusCodes } from "http-status-codes";
import { IocContainer } from "src/containers/inversify.container";

/**
 * Because of the twitter API price, we will use it only to post on the bot account.
 */
export default async function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
): Promise<void> {
  const brightDataMonitorRepository = IocContainer.container.get(
    BrightDataMonitorRepository
  );
  fastify.get(
    "/monitor",
    async (
      request: FastifyRequest<{
        Querystring: {
          snapshot_id: string;
          url: string;
        };
      }>,
      reply: FastifyReply
    ) => {
      const { snapshot_id, url } = request.query;
      const monitorResponse = brightDataMonitorRepository.getTransaction(
        snapshot_id,
        url
      );
      reply.status(StatusCodes.OK).send(monitorResponse);
    }
  );

  // TODO: ajouter un type pour la request
  fastify.post(
    "/monitor",
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(request.body);
    }
  );
}
