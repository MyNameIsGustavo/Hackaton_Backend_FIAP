import { TurmaRepository } from "../../../repositories/pg/turma.repository";
import { DeletarTurmaUseCase } from "../deletar";

export async function fabricaDeletarTurmas() {
    return new DeletarTurmaUseCase(new TurmaRepository());
}