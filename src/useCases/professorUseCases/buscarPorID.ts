import type { IProfessorRepository } from "../../repositories/professor.repository.interface";
import { IProfessorComIdade } from "../../entities/interfaces/IProfessor";
import { calcularIdade } from "../../utils/calculaIdade";

export class BuscarProfessorPorIDUseCase {
    constructor(private professorRepository: IProfessorRepository) { }

    async processar(id: number): Promise<IProfessorComIdade | null> {
        const professor = await this.professorRepository.buscarProfessorPorID(id);

        if (!professor) return null;

        return {
            ...professor,
            idade: calcularIdade(professor.dataNascimento)
        };
    }
}