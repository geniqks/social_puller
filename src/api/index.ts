import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { Server } from "./server";

@bind("singleton")
@injectable()
export class ApiHandler {
  constructor(private readonly server: Server) {}

  public async start(): Promise<void> {
    await this.server.fastify.listen({ port: 3000 });
  }
}
