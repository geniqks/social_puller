import { EnvEnum } from "@config/env";

// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv { }
  }
}

export interface IProcessEnv {
  ENABLE_API: boolean;
  ENV: EnvEnum;
  INSTAGRAM_CLIENT_ID: string;
  INSTAGRAM_CLIENT_SECRET: string;
  MONGO_URI: string;
  PORT: string;
  REDDIT_CLIENT_ID: string;
  REDDIT_CLIENT_SECRET: string;
  REDDIT_PASSWORD: string;
  REDDIT_REDIRECT_URI: string;
  REDDIT_USERNAME: string;
  REDDIT_USER_AGENT: string;
  REDDIT_USER_TOKEN: string;
  TWITTER_BEARER_TOKEN: string;
}

export { };

