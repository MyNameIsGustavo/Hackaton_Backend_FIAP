import type { IPeriodoRepository } from "../../repositories/periodo.repository.interface";
import { IPeriodo } from "../../entities/interfaces/IPeriodo";

export class CadastroPeriodoUseCase {
    constructor(private periodoRepository: IPeriodoRepository) { }

    async processar(dados: IPeriodo): Promise<IPeriodo | null> {
        return await this.periodoRepository.cadastrarPeriodo(dados);
    }
}