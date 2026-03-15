import type { ITurmaRepository } from "../../repositories/turma.repository.interface";
import { ITurma } from "../../entities/interfaces/ITurma";

export class BuscarTodasTurmasUseCase {
    constructor(private turmaRepository: ITurmaRepository) { }

    async processar(): Promise<ITurma[] | []> {
        return await this.turmaRepository.buscarTodasTurmas();
    }
}