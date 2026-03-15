import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "PRODUCAO" ? ".env" : ".env.dev";
dotenv.config({ path: envFile });

const pool = new Pool({ connectionString: process.env.DB_CONNECTION, });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });