import { bind } from "@decorators/bind.decorator";
import { ConfigService } from "@services/config.service";
import { LoggerService } from "@services/logger.service";
import { injectable } from "inversify";
import mongoose, { Mongoose } from "mongoose";

@bind("singleton")
@injectable()
export class Mongo {
  public static mongoose: Mongoose;
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService
  ) {}

  public async connect() {
    const mongoUri = this.config.get<string>("MONGO_URI");
    try {
      const connection = await mongoose.connect(mongoUri);
      Mongo.mongoose = connection;
      return true;
    } catch (err) {
      this.logger.pino.error(err);
      process.exit(1);
    }
  }
}
