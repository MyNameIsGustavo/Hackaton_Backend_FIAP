import type { IAulaRepository } from "../../repositories/aula.repository.interface";
import { IAula, IAulaComRelacoes } from "../../entities/interfaces/IAula";

type FiltroAula = {
    nomeAula?: string;
    pagina?: number;
    limite?: number;
    ordenaPor?: string;
    ordem?: "asc" | "desc"
};

export class BuscarTodasAulasUseCase {
    constructor(private aulaRepository: IAulaRepository) { }

    async processar(filtro?: FiltroAula): Promise<IAulaComRelacoes[]> {
        return await this.aulaRepository.buscarTodasAulas(filtro);
    }
}