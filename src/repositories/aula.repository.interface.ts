import { IAula } from "../entities/interfaces/IAula";

export interface IAulaRepository {
    cadastrarAula(dados: IAula): Promise<IAula | null>
    buscarTodasAulas(): Promise<IAula[] | []>
    buscarAulaPorID(id: number): Promise<IAula | null>;
    alterarAula(dados: IAula, id: number): Promise<IAula | null>;
    deletarAula(id:number): Promise<IAula | null>;
}