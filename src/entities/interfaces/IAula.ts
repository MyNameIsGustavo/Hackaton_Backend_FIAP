import { IPlanoAula } from "./IPlanoAula";
import { IProfessor } from "./IProfessor";
import { ITurma } from "./ITurma";

export interface IAula {
    id?: number;
    nome: string;
    objetivosAprendizagem: string;
    dataAula: Date;
    isAtivo: boolean;
    turmaId: number;
    materiaId?: number | null;
}

export interface IAulaComRelacoes extends IAula {
    professores?: IProfessor[];
    planoAula: IPlanoAula | null;
    turma: ITurma;
}