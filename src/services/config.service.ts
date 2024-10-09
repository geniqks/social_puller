import { IProcessEnv } from "@customTypes/environment";
import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";

@bind()
@injectable()
export class ConfigService {
  /**
   * Get env variables
   */
  public get<T>(value: keyof IProcessEnv): T {
    const envValue = process.env[value];

    if (envValue === "true") {
      return true as T;
    }

    if (envValue === "false") {
      return false as T;
    }

    if (!Number.isNaN(Number(envValue))) {
      return Number(envValue) as T;
    }

    return envValue as T;
  }
}
