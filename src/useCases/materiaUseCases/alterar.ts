import type { IMateriaRepository } from "../../repositories/materia.repository.interface";
import { IMateria } from "../../entities/interfaces/IMateria";

export class AlterarMateriaUseCase {
    constructor(private materiaRepository: IMateriaRepository) { }

    async processar(dados: Omit<IMateria, "dataCadastro">, id: number): Promise<IMateria | null> {
        return await this.materiaRepository.alterarMateria(dados, id);
    }
}