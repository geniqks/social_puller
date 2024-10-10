import { bind } from "@decorators/bind.decorator";
import autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { ConfigService } from "@services/config.service";
import { LoggerService } from "@services/logger.service";
import { injectable } from "inversify";
import * as path from "path";
import { Server } from "./server/server";

@bind()
@injectable()
export class ApiHandler {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    private readonly server: Server
  ) { }

  public async init(): Promise<void> {
    await this.registerPlugins();

    const port = this.configService.get<number>("PORT");
    this.server.fastify.listen({ port }, () =>
      this.loggerService.pino.info("Server is running")
    );
  }

  private async registerPlugins(): Promise<void> {
    this.server.fastify.register(helmet, {
      global: true,
    });

    await this.server.fastify.register(cors, {
      origin: "*",
    });

    await this.server.fastify.register(autoload, {
      dir: path.join(__dirname, "routers"),
    });
  }
}
