import { Materia } from "./materia.entity";
import { Turma } from "./turma.entity";

export class Periodo {
    id: number;
    nome: string;
    horarioInicio: string;
    horarioFim: string;
    turma: Turma[];
    materia: Materia[];

    constructor(
        id: number,
        nome: string,
        horarioInicio: string,
        horarioFim: string,
        turma: Turma[] = [],
        materia: Materia[] = []
    ) {
        this.id = id;
        this.nome = nome;
        this.horarioInicio = horarioInicio;
        this.horarioFim = horarioFim;
        this.turma = turma;
        this.materia = materia;
    }
}