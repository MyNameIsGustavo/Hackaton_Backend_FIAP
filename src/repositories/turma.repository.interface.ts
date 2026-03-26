import { ITurma, ITurmaComRelacoes } from "../entities/interfaces/ITurma";

export interface ITurmaRepository {
    cadastrarTurma(dados: ITurma): Promise<ITurma | null>
    buscarTodasTurmas(filtro?: { nomeTurma?: string; pagina?: number; limite?: number; ordenaPor?: string; ordem?: "asc" | "desc"; }): Promise<ITurmaComRelacoes[]>
    buscarTurmaPorID(id: number): Promise<ITurma | null>;
    alterarTurma(dados: ITurma, id: number): Promise<ITurma | null>;
    deletarTurma(id: number): Promise<ITurma | null>
}