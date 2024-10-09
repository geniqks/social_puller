import { EnvEnum } from "@config/env";
import { IProcessEnv } from "@customTypes/environment";
import { z } from "zod";

export default (): Record<keyof IProcessEnv, z.ZodType<unknown>> => ({
  ENV: z.nativeEnum(EnvEnum),
  INSTAGRAM_CLIENT_ID: z.string(),
  INSTAGRAM_CLIENT_SECRET: z.string(),
  MONGO_URI: z.string(),
  PORT: z.string().transform(Number),
  REDDIT_CLIENT_ID: z.string(),
  REDDIT_CLIENT_SECRET: z.string(),
  REDDIT_PASSWORD: z.string(),
  REDDIT_REDIRECT_URI: z.string(),
  REDDIT_USERNAME: z.string(),
  REDDIT_USER_AGENT: z.string(),
  REDDIT_USER_TOKEN: z.string().optional(),
  TWITTER_BEARER_TOKEN: z.string(),
});
