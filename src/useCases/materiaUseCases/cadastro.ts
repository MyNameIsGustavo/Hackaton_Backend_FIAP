import type { IMateriaRepository } from "../../repositories/materia.repository.interface";
import { IMateria } from "../../entities/interfaces/IMateria";

export class CadastroMateriaUseCase {
    constructor(private materiaRepository: IMateriaRepository) { }

    async processar(dados: IMateria): Promise<IMateria | null> {
        return await this.materiaRepository.cadastrarMateria(dados);
    }
}