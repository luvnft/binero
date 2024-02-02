/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SESSION_SECRET: string;
    }
  }
}

declare module '@remix-run/node' {
  interface AppLoadContext {
    env?: {
      readonly SESSION_SECRET: string;
    };
  }
}

export {};
