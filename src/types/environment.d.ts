// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: "development" | "production";
      PORT: string;
    }
  }
}

export {};
