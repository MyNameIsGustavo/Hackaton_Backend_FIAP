import type { IProfessorRepository } from "../../repositories/professor.repository.interface";
import { IProfessorComIdade } from "../../entities/interfaces/IProfessor";
import { calcularIdade } from "../../utils/calculaIdade";

export class BuscarProfessorPorEmailUseCase {
    constructor(private professorRepository: IProfessorRepository) { }

    async processar(email: string): Promise<IProfessorComIdade | null> {
        const professor = await this.professorRepository.buscarProfessorPorEmail(email);

        if (!professor) return null;

        return {
            ...professor,
            idade: calcularIdade(professor.dataNascimento)
        };
    }
}