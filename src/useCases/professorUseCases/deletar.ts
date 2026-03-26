import type { IProfessorRepository } from "../../repositories/professor.repository.interface";
import { IProfessor } from "../../entities/interfaces/IProfessor";

export class DeletarProfessorUseCase {
    constructor(private professorRepository: IProfessorRepository) { }

    async processar(id: number): Promise<IProfessor | null> {
        return await this.professorRepository.deletarProfessor(id);
    }
}