import { AulaRepository } from "../../../repositories/pg/aula.repository";
import { AlterarAulaUseCase } from "../alterar";

export async function fabricaAlterarAula() {
    return new AlterarAulaUseCase(new AulaRepository());
}