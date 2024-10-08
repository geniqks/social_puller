import { bind } from "@decorators/bind.decorator";
import autoload from "@fastify/autoload";
import { injectable } from "inversify";
import * as path from "path";
import { Server } from "./server";

@bind("singleton")
@injectable()
export class ApiHandler {
  constructor(private readonly server: Server) {}

  public async start(): Promise<void> {
    await this.server.fastify.register(autoload, {
      dir: path.join(__dirname, "controllers"),
    });

    const port = parseInt(process.env.PORT);
    this.server.fastify.listen({ port }, () =>
      console.log("Server is running")
    );
  }
}
