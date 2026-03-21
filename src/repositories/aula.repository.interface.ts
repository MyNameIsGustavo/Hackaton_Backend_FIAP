import { IAula, IAulaComRelacoes } from "../entities/interfaces/IAula";

export interface IAulaRepository {
    cadastrarAula(dados: IAula): Promise<IAula | null>
    buscarTodasAulas(filtro?: { nomeAula?: string; pagina?: number; limite?: number; ordenaPor?: string; ordem?: "asc" | "desc"; }): Promise<IAulaComRelacoes[]>
    buscarAulaPorID(id: number): Promise<IAula | null>;
    alterarAula(dados: IAula, id: number): Promise<IAula | null>;
    deletarAula(id:number): Promise<IAula | null>;
}