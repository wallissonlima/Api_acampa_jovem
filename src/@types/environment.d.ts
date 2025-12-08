declare namespace NodeJS {
  interface ProcessEnv {
    MP_ACCESS_TOKEN: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    PORT?: string;
  }
}
