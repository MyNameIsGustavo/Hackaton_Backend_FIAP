import type { IAulaRepository } from "../../repositories/aula.repository.interface";
import { IAula } from "../../entities/interfaces/IAula";

export class AlterarAulaUseCase {
    constructor(private aulaRepository: IAulaRepository) { }

    async processar(dados: IAula, id: number): Promise<IAula | null> {
        return await this.aulaRepository.alterarAula(dados, id);
    }
}