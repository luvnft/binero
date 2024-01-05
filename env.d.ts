/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly SESSION_SECRET: string;
  }
}
