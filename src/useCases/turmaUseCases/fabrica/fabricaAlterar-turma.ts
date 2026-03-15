import { TurmaRepository } from "../../../repositories/pg/turma.repository";
import { AlterarTurmaUseCase } from "../alterar";

export async function fabricaAlterarTurma() {
    return new AlterarTurmaUseCase(new TurmaRepository());
}