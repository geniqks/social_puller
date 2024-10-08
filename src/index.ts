import "reflect-metadata";
import { IocContainer } from "./containers/inversify.container";
// Need to init container before importing any modules
IocContainer.initContainer();

import { ApiHandler } from "@api/";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const apiHandler = IocContainer.container.get(ApiHandler);
apiHandler.start();
