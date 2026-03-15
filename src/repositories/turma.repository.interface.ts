import { ITurma } from "../entities/interfaces/ITurma";

export interface ITurmaRepository {
    cadastrarTurma(dados: ITurma): Promise<ITurma | null>
    buscarTodasTurmas(): Promise<ITurma[] | []>
    buscarTurmaPorID(id: number): Promise<ITurma | null>;
    alterarTurma(dados: ITurma, id: number): Promise<ITurma | null>;
}