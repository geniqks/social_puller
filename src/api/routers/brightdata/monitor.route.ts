import { IBrightDataMonitorInput } from "@models/brightdata-monitor.model";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IocContainer } from "src/containers/inversify.container";
import { BrightDataMonitorRepository } from "src/repositories/brightdata-monitor.repository";

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

  // TODO: handle return for url that does not exist
  fastify.post(
    "/monitor",
    async (
      request: FastifyRequest<{
        Body: IBrightDataMonitorInput;
      }>,
      reply: FastifyReply
    ) => {
      const { snapshot_id, status, error_message } = request.body;

      await brightDataMonitorRepository.updateTransactionStatus({
        snapshot_id,
        status,
        error_message,
      });

      reply.status(StatusCodes.OK).send(ReasonPhrases.OK);
    }
  );
}
