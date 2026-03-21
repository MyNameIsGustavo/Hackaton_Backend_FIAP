import type { IMateriaRepository } from "../../repositories/materia.repository.interface";
import { IMateria } from "../../entities/interfaces/IMateria";

export class DeletarMateriaUseCase {
    constructor(private materiaRepository: IMateriaRepository) { }

    async processar(id: number): Promise<IMateria | null> {
        return await this.materiaRepository.deletarMateria(id);
    }
}