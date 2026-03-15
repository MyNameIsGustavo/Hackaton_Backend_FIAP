import type { IPeriodoRepository } from "../../repositories/periodo.repository.interface";
import { IPeriodo } from "../../entities/interfaces/IPeriodo";

export class AlterarPeriodoUseCase {
    constructor(private periodoRepository: IPeriodoRepository) { }

    async processar(dados: IPeriodo, id: number): Promise<IPeriodo | null> {
        return await this.periodoRepository.alterarPeriodo(dados, id);
    }
}