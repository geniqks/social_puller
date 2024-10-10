import { EnvEnum } from "@config/env";
import { bind } from "@decorators/bind.decorator";
import { injectable } from "inversify";
import { type Logger, pino } from 'pino';
import pretty from 'pino-pretty';
import { ConfigService } from "./config.service";

type PinoType = Logger<unknown>;

@bind()
@injectable()
export class LoggerService {
  private _pino: PinoType;

  public constructor(configService: ConfigService) {
    const env = configService.get<EnvEnum>('ENV');
    if (env === EnvEnum.DEVELOPMENT) {
      this._pino = pino(
        pretty({
          colorize: true,
        }),
      );
    } else {
      this._pino = pino();
    }
  }

  /**
   * Access to pino library
   */
  get pino(): PinoType {
    return this._pino;
  }
}
