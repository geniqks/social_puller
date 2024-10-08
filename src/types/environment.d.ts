// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "development" | "production";
      INSTAGRAM_CLIENT_ID: string;
      INSTAGRAM_CLIENT_SECRET: string;
      MONGO_URI: string;
      PORT: string;
      TWITTER_BEARER_TOKEN: string;
    }
  }
}

export {};
