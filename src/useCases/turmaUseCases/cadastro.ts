import type { ITurmaRepository } from "../../repositories/turma.repository.interface";
import { ITurma } from "../../entities/interfaces/ITurma";

export class CadastroTurmaUseCase {
    constructor(private professorRepository: ITurmaRepository) { }

    async processar(dados: ITurma): Promise<ITurma | null> {
        return await this.professorRepository.cadastrarTurma(dados);
    }
}