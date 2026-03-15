import { TurmaRepository } from "../../../repositories/pg/turma.repository";
import { CadastroTurmaUseCase } from "../cadastro";

export async function fabricaCadastrarTurmas() {
    return new CadastroTurmaUseCase(new TurmaRepository());
}