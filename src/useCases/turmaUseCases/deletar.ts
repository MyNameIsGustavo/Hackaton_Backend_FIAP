import type { ITurmaRepository } from "../../repositories/turma.repository.interface";
import { ITurma } from "../../entities/interfaces/ITurma";

export class DeletarTurmaUseCase {
    constructor(private turmaRepository: ITurmaRepository) { }

    async processar(id: number): Promise<ITurma | null> {
        return await this.turmaRepository.deletarTurma(id);
    }
}