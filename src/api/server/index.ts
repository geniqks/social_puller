import { EnvEnum } from "@config/env";
import { bind } from "@decorators/bind.decorator";
import { ConfigService } from "@services/config.service";
import Fastify, { FastifyInstance } from "fastify";
import { injectable } from "inversify";

const envToLogger: Record<EnvEnum, any> = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  production: true,
};

@bind("singleton")
@injectable()
export class Server {
  private _fastify: FastifyInstance;

  public get fastify(): FastifyInstance {
    return this._fastify;
  }

  constructor(private readonly configService: ConfigService) {
    const env: EnvEnum =
      this.configService.get<EnvEnum>("ENV") ?? EnvEnum.DEVELOPMENT;
    this._fastify = Fastify({
      logger: envToLogger[env],
    });
  }
}
