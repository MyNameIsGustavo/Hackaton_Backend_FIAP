import { bancoDeDados } from "./lib/pg/db";
import { app } from "./servidor";
import dotenv from "dotenv";

dotenv.config();
const envFile = process.env.NODE_ENV === 'PRODUCAO' ? '.env' : '.env.dev';
dotenv.config({ path: envFile });

async function appHackatonFIAP() {
    await bancoDeDados.conectar();

    app;
}

appHackatonFIAP();