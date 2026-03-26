import { seedAulas } from "../seeds/seedAula";
import { seedMaterias } from "../seeds/seedMaterias";
import { seedPeriodos } from "../seeds/seedPeriodos";
import { seedUsuarios } from "../seeds/seedProfessores";
import { seedTurmas } from "../seeds/seedTurma";
import { seedBncc } from "../seeds/seedBncc";

export async function processaSeeds() {
    await seedUsuarios();
    await seedPeriodos();
    await seedTurmas();
    await seedMaterias();
    await seedBncc();
    await seedAulas();
}