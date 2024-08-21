export const dataConfig = () => ({
  application: {
    port: Number(process.env.PORT) || 3030,
  },
  cors: {
    corsOrigin: process.env.CORS_ORIGIN?.split(';'),
    corsMethods:
      process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    database: process.env.DATABASE || 'postgres',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
  },
});

export type AppConfigType = ReturnType<typeof dataConfig>;
