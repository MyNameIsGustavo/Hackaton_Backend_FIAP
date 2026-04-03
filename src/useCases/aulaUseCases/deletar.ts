import type { IAulaRepository } from "../../repositories/aula.repository.interface";
import { IAula } from "../../entities/interfaces/IAula";

export class DeletarAulaUseCase {
    constructor(private aulaRepository: IAulaRepository) { }

    async processar(id: number, professorId?: number): Promise<IAula | null> {
        return await this.aulaRepository.deletarAula(id, professorId);
    }
}
