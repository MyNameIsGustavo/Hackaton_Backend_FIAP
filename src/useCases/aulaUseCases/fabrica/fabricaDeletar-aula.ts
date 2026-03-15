import { AulaRepository } from "../../../repositories/pg/aula.repository";
import { DeletarAulaUseCase } from "../deletar";

export async function fabricaDeletarAula() {
    return new DeletarAulaUseCase(new AulaRepository());
}