import type { IAulaRepository } from "../../repositories/aula.repository.interface";
import { IAula } from "../../entities/interfaces/IAula";

export class CadastroAulaUseCase {
    constructor(private aulaRepository: IAulaRepository) { }

    async processar(dados: IAula): Promise<IAula | null> {
        return await this.aulaRepository.cadastrarAula(dados);
    }
}