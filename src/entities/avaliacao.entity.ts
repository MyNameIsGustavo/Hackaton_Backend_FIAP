import { Turma } from "./turma.entity";
import { Materia } from "./materia.entity";
import { HabilidadeBNCC } from "./habilidadeBNCC.entity";

export class Avaliacao {
    id: number;
    nome: string;
    dataAvaliacao: Date;
    tipo: string;
    isAtivo: boolean;

    turmaId: number;
    turma?: Turma;

    materiaId: number;
    materia?: Materia;

    habilidadesBNCC: HabilidadeBNCC[];

    constructor(
        id: number,
        nome: string,
        dataAvaliacao: Date,
        tipo: string,
        isAtivo: boolean,
        turmaId: number,
        materiaId: number,
        habilidadesBNCC: HabilidadeBNCC[] = [],
        turma?: Turma,
        materia?: Materia
    ) {
        this.id = id;
        this.nome = nome;
        this.dataAvaliacao = dataAvaliacao;
        this.tipo = tipo;
        this.isAtivo = isAtivo;
        this.turmaId = turmaId;
        this.materiaId = materiaId;
        this.habilidadesBNCC = habilidadesBNCC;
        this.turma = turma;
        this.materia = materia;
    }
}