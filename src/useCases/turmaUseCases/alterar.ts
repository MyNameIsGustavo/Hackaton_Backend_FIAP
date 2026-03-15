import type { ITurmaRepository } from "../../repositories/turma.repository.interface";
import { ITurma } from "../../entities/interfaces/ITurma";

export class AlterarTurmaUseCase {
    constructor(private turmaRepository: ITurmaRepository) { }

    async processar(dados: ITurma, id: number): Promise<ITurma | null> {
        return await this.turmaRepository.alterarTurma(dados, id);
    }
}