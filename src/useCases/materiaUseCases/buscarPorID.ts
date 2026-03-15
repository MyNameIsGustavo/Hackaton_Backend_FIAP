import type { IMateriaRepository } from "../../repositories/materia.repository.interface";
import { IMateria } from "../../entities/interfaces/IMateria";

export class BuscarMateriaPorIDUseCase {
    constructor(private materiaRepository: IMateriaRepository) { }

    async processar(id: number): Promise<IMateria | null> {
        return await this.materiaRepository.buscarMateriaPorID(id);
    }
}