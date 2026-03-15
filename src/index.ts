import { materiasRotas } from "./http/controller/materia/rotas";
import { periodosRotas } from "./http/controller/periodos/rotas";
import { professorRotas } from "./http/controller/professor/rotas";
import { bancoDeDados } from "./lib/pg/db";
import { processaSeeds } from "./repositories/pg/processaSeeds";
import { app } from "./servidor";
import { configuracaoSwagger } from "./swagger";
import { turmaRotas } from "./http/controller/turma/rotas";
import { aulaRotas } from "./http/controller/aula/rotas";
import dotenv from "dotenv";

dotenv.config();
const envFile = process.env.NODE_ENV === 'PRODUCAO' ? '.env' : '.env.dev';
dotenv.config({ path: envFile });

async function appHackatonFIAP() {
    await bancoDeDados.conectar();
    await processaSeeds();

    app;
    await professorRotas(app);
    await periodosRotas(app);
    await materiasRotas(app);
    await turmaRotas(app);
    await aulaRotas(app);
    configuracaoSwagger(app);
}

appHackatonFIAP();