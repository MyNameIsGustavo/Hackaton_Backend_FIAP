import { Professor } from "./professor.entity";
import { Turma } from "./turma.entity";
import { PlanoAula } from "./planoAula.entity";
import { Materia } from "./materia.entity";

export class Aula {
    id: number;
    nome: string;
    objetivosAprendizagem: string;
    dataAula: Date;
    isAtivo: boolean;

    professores: Professor[];

    turmaId: number;
    turma?: Turma;

    planoAula?: PlanoAula | null;

    materiaId?: number | null;
    materia?: Materia | null;

    constructor(
        id: number,
        nome: string,
        objetivosAprendizagem: string,
        dataAula: Date,
        isAtivo: boolean,
        turmaId: number,
        professores: Professor[] = [],
        turma?: Turma,
        planoAula?: PlanoAula | null,
        materiaId?: number | null,
        materia?: Materia | null
    ) {
        this.id = id;
        this.nome = nome;
        this.objetivosAprendizagem = objetivosAprendizagem;
        this.dataAula = dataAula;
        this.isAtivo = isAtivo;
        this.turmaId = turmaId;
        this.professores = professores;
        this.turma = turma;
        this.planoAula = planoAula;
        this.materiaId = materiaId;
        this.materia = materia;
    }
}