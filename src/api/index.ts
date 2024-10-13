import { bind } from "@decorators/bind.decorator";
import autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { ConfigService } from "@services/config.service";
import { LoggerService } from "@services/logger.service";
import { StatusCodes } from "http-status-codes";
import { injectable } from "inversify";
import * as path from "path";
import { loadSchemas } from "src/schemas/fastify.schema";
import { HttpException } from "./errors/http-exception.error";
import { Server } from "./server/server";

@bind()
@injectable()
export class ApiHandler {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    private readonly server: Server
  ) {}

  public async init(): Promise<void> {
    await this.registerPlugins();

    const port = this.configService.get<number>("PORT");
    this.server.fastify.listen({ port, host: "0.0.0.0" }, () =>
      this.loggerService.pino.info("Server is running")
    );
  }

  private async registerPlugins(): Promise<void> {
    this.server.fastify.register(helmet, {
      global: true,
    });

    await this.handleErrors();

    await this.server.fastify.register(cors, {
      origin: "*",
    });

    await this.server.fastify.register(autoload, {
      dir: path.join(__dirname, "routers"),
    });

    loadSchemas(this.server.fastify);
  }

  private async handleErrors(): Promise<void> {
    this.server.fastify.setErrorHandler((error, _request, reply) => {
      if (error instanceof HttpException) {
        reply.status(error.statusCode).send(error.formatError());
      }

      reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ ok: false });
    });
  }
}
