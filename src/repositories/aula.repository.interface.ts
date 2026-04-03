import { IAula, IAulaComRelacoes } from "../entities/interfaces/IAula";

export interface IAulaRepository {
    cadastrarAula(dados: IAula, professorId?: number): Promise<IAula | null>
    buscarTodasAulas(
        filtro?: { nomeAula?: string; pagina?: number; limite?: number; ordenaPor?: string; ordem?: "asc" | "desc"; },
        professorId?: number
    ): Promise<IAulaComRelacoes[]>
    buscarAulaPorID(id: number, professorId?: number): Promise<IAula | null>;
    alterarAula(dados: IAula, id: number, professorId?: number): Promise<IAula | null>;
    deletarAula(id:number, professorId?: number): Promise<IAula | null>;
}
