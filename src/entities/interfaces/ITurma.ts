import { IAula } from "./IAula";
import { IAvaliacao } from "./IAvaliacao";
import { IPeriodo } from "./IPeriodo";

export interface ITurma {
    nome: string;
    anoEscolar: number;
    anoLetivo: number;
    isAtivo: boolean;
    periodoId: number;
}

export interface ITurmaComRelacoes extends ITurma {
    periodo: IPeriodo;
    aulas: IAula[];
    avaliacaos: IAvaliacao[];
}