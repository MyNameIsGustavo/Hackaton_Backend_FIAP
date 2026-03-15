import type { IAulaRepository } from "../../repositories/aula.repository.interface";
import { IAula } from "../../entities/interfaces/IAula";

export class DeletarAulaUseCase {
    constructor(private aulaRepository: IAulaRepository) { }

    async processar(id: number): Promise<IAula | null> {
        return await this.aulaRepository.deletarAula(id);
    }
}