import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { z } from "zod";

export enum EnvEnum {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

@bind()
@injectable()
export class Environment {
  /**
   * Process and validate env variables
   */
  public process(variables: { [key: string]: any }) {
    const schema = z.object(variables);
    const parsed = schema.safeParse(process.env);

    if (parsed.error) {
      console.error(
        "❌ Invalid environment variables:",
        JSON.stringify(parsed.error.format(), null, 4)
      );
      process.exit(1);
    }
  }
}
