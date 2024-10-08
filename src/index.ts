import "reflect-metadata";
import { IocContainer } from "./containers/inversify.container";
// Need to init container before importing any modules
IocContainer.initContainer();

import { ApiHandler } from "@api/";
import { Environment } from "@config/env";
import envSchema from "@start/env";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const env = IocContainer.container.get(Environment);
env.process(envSchema);

const apiHandler = IocContainer.container.get(ApiHandler);
apiHandler.start();
