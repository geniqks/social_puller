import { EnvEnum } from "@config/env";

// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}

export interface IProcessEnv {
  ENV: EnvEnum;
  INSTAGRAM_CLIENT_ID: string;
  INSTAGRAM_CLIENT_SECRET: string;
  MONGO_URI: string;
  PORT: string;
  TWITTER_BEARER_TOKEN: string;
}

export {};
