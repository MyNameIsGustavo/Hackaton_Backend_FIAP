import { AulaRepository } from "../../../repositories/pg/aula.repository";
import { BuscarAulaPorIDUseCase } from "../buscarPorID";

export async function fabricaBuscarAulaPorID() {
    return new BuscarAulaPorIDUseCase(new AulaRepository());
}