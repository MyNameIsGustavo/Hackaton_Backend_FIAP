import type { IMateriaRepository } from "../../repositories/materia.repository.interface";
import { IMateria } from "../../entities/interfaces/IMateria";

export class BuscarTodasMateriasUseCase {
    constructor(private materiaRepository: IMateriaRepository) { }

    async processar(): Promise<IMateria[] | []> {
        return await this.materiaRepository.buscarTodasMaterias();
    }
}