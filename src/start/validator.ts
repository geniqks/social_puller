import { EnvEnum } from "@config/env";
import { IProcessEnv } from "@customTypes/environment";
import { z } from "zod";

export default (): Record<keyof IProcessEnv, z.ZodType<unknown>> => ({
  ENV: z.nativeEnum(EnvEnum),
  INSTAGRAM_CLIENT_ID: z.string(),
  INSTAGRAM_CLIENT_SECRET: z.string(),
  MONGO_URI: z.string(),
  PORT: z.string().transform(Number),
  TWITTER_BEARER_TOKEN: z.string(),
});