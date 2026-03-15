import { IPeriodo } from "../entities/interfaces/IPeriodo";

export interface IPeriodoRepository {
    cadastrarPeriodo(dados: IPeriodo): Promise<IPeriodo | null>
    buscarTodosPeriodos(): Promise<IPeriodo[] | []>
    buscarPeriodoPorID(id: number): Promise<IPeriodo | null>;
    alterarPeriodo(dados: IPeriodo, id: number): Promise<IPeriodo | null>;
}