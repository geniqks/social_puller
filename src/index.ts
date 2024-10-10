import "reflect-metadata";
import { IocContainer } from "./containers/inversify.container";
// Need to init container before importing any modules
IocContainer.initContainer();

import { ApiHandler } from "@api/";
import { Environment } from "@config/env";
import { ConfigService } from "@services/config.service";
import envSchema from "@start/validator";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const configService = IocContainer.container.get(ConfigService);

const env = IocContainer.container.get(Environment);
env.process(envSchema());

if (configService.get<boolean>("ENABLE_API")) {
  const api = IocContainer.container.get(ApiHandler);
  api.init();
}
