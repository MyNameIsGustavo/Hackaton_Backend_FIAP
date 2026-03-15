import type { IPeriodoRepository } from "../../repositories/periodo.repository.interface";
import { IPeriodo } from "../../entities/interfaces/IPeriodo";

export class BuscarPeriodoPorIDUseCase {
    constructor(private periodoRepository: IPeriodoRepository) { }

    async processar(id: number): Promise<IPeriodo | null> {
        return await this.periodoRepository.buscarPeriodoPorID(id);
    }
}