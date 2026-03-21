import { IPeriodo, IPeriodoComRelacoes } from "../entities/interfaces/IPeriodo";

export interface IPeriodoRepository {
    cadastrarPeriodo(dados: IPeriodo): Promise<IPeriodo | null>
    buscarTodosPeriodos(filtro?: { nomePeriodo?: string }): Promise<IPeriodoComRelacoes[] | []>
    buscarPeriodoPorID(id: number): Promise<IPeriodo | null>;
    alterarPeriodo(dados: IPeriodo, id: number): Promise<IPeriodo | null>;
    deletarPeriodo(id: number): Promise<IPeriodo | null>
}