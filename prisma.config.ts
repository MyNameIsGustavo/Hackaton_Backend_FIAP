import "dotenv/config";
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

dotenv.config();
const envFile = process.env.NODE_ENV === 'PRODUCAO' ? '.env' : '.env.dev';
dotenv.config({ path: envFile });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", },
  datasource: { url: process.env["DB_CONNECTION"], },
});
