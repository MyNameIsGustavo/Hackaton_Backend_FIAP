import type { IPeriodoRepository } from "../../repositories/periodo.repository.interface";
import { IPeriodoComRelacoes } from "../../entities/interfaces/IPeriodo";

type FiltroPeriodo = {
    nomePeriodo?: string;
    pagina?: number;
    limite?: number;
    ordenaPor?: string;
    ordem?: "asc" | "desc"
};

export class BuscarTodosPeriodosUseCase {
    constructor(private periodoRepository: IPeriodoRepository) { }

    async processar(filtro?: FiltroPeriodo): Promise<IPeriodoComRelacoes[] | []> {
        return await this.periodoRepository.buscarTodosPeriodos(filtro);
    }
}