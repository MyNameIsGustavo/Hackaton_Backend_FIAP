import { IMateria } from "./IMateria";
import { ITurma } from "./ITurma";

export interface IPeriodo {
    nome: string;
    horarioInicio: string;
    horarioFim: string;
}

export interface IPeriodoComRelacoes extends IPeriodo {
    turmas: ITurma[];
    materias: IMateria[];
}