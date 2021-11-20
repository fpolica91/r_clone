import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import path from "path";

export async function connection(): Promise<void> {
  await createConnection({
    type: "postgres",
    database: process.env.DATABASE_NAME,
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    logging: __prod__,
    synchronize: true,
    entities: [path.join(__dirname, "./entities/**/*.ts")],
  });
}
