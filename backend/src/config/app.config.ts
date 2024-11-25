import { getEnv } from "./getEnv";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  APP_ORIGIN: getEnv("APP_ORIGIN", "localhost"),
  PORT: getEnv("PORT", "5000"),
  BASE_URL_VERSION: getEnv("BASE_URL_VERSION", "/api/v1"),

  DB: {
    MONGOOSE: { URI: getEnv("MONGO_URI") },
    POSTGRES: {
      DIALECT: getEnv("DB_DIALECT", "postgres"),
      DATABASE: getEnv("DB_DATABASE"),
      USERNAME: getEnv("DB_USERNAME", "postgres"),
      PASSWORD: getEnv("DB_PASSWORD"),
      HOST: getEnv("DB_HOST", "localhost"),
      PORT: getEnv("DB_PORT", "5536"),
    },
    MSSQL: {
      DIALECT: getEnv("DB_DIALECT", "mssql"),
      DATABASE: getEnv("DB_DATABASE"),
      USERNAME: getEnv("DB_USERNAME", "postgres"),
      PASSWORD: getEnv("DB_PASSWORD"),
      HOST: getEnv("DB_HOST", "localhost"),
      PORT: getEnv("DB_PORT", "5536"),
    },
  },

  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m"),
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
    REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
  },
});

export const config = appConfig();
