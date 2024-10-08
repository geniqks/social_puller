import { bind } from "@decorators/bind.decorator";
import Fastify, { FastifyInstance } from "fastify";
import { injectable } from "inversify";

// type ProcessEnvKeys = typeof process.env.ENV;
// const envToLogger: Record<any, any> = {
//   development: {
//     transport: {
//       target: "pino-pretty",
//       options: {
//         translateTime: "HH:MM:ss Z",
//         ignore: "pid,hostname",
//       },
//     },
//   },
//   production: true,
// };

@bind("singleton")
@injectable()
export class Server {
  private _fastify: FastifyInstance;

  public get fastify(): FastifyInstance {
    return this._fastify;
  }

  constructor() {
    this._fastify = Fastify();
  }
}
