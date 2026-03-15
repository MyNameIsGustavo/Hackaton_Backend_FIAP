import type { IProfessorRepository } from "../../repositories/professor.repository.interface";
import { IProfessor } from "../../entities/interfaces/IProfessor";

export class BuscarProfessorPorEmailUseCase {
    constructor(private professorRepository: IProfessorRepository) { }

    async processar(email: string): Promise<IProfessor | null> {
        return await this.professorRepository.buscarProfessorPorEmail(email);
    }
}