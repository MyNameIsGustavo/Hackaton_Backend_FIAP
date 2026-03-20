import type { ITurmaRepository } from "../../repositories/turma.repository.interface";
import { ITurma, ITurmaComRelacoes } from "../../entities/interfaces/ITurma";

type FiltroTurma = {
    nomeTurma?: string;
    pagina?: number;
    limite?: number;
    ordenaPor?: string;
    ordem?: "asc" | "desc"
};

export class BuscarTodasTurmasUseCase {
    constructor(private turmaRepository: ITurmaRepository) { }

    async processar(filtro?: FiltroTurma): Promise<ITurmaComRelacoes[] | []> {
        return await this.turmaRepository.buscarTodasTurmas(filtro);
    }
}