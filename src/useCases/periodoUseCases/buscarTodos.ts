import type { IPeriodoRepository } from "../../repositories/periodo.repository.interface";
import { IPeriodo } from "../../entities/interfaces/IPeriodo";

export class BuscarTodosPeriodosUseCase {
    constructor(private periodoRepository: IPeriodoRepository) { }

    async processar(): Promise<IPeriodo[] | []> {
        return await this.periodoRepository.buscarTodosPeriodos();
    }
}