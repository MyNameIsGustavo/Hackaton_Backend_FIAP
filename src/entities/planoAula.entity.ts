import { Aula } from "./aulas.entity";
import { HabilidadeBNCC } from "./habilidadeBNCC.entity";

export class PlanoAula {
    id: number;

    aulaId: number;
    aula?: Aula;
    professorId: number;
    habilidadeBNCCId: number;
    habilidadeBNCC?: HabilidadeBNCC;

    objetivo: string;
    metodologia: string;
    recursosDidaticos: string;
    avaliacao: string;
    dataCadastro: Date;

    constructor(
        id: number,
        aulaId: number,
        professorId: number,
        habilidadeBNCCId: number,
        objetivo: string,
        metodologia: string,
        recursosDidaticos: string,
        avaliacao: string,
        dataCadastro: Date,
        habilidadeBNCC?: HabilidadeBNCC,
        aula?: Aula
    ) {
        this.id = id;
        this.aulaId = aulaId;
        this.professorId = professorId;
        this.habilidadeBNCCId = habilidadeBNCCId;
        this.objetivo = objetivo;
        this.metodologia = metodologia;
        this.recursosDidaticos = recursosDidaticos;
        this.avaliacao = avaliacao;
        this.dataCadastro = dataCadastro;
        this.habilidadeBNCC = habilidadeBNCC;
        this.aula = aula;
    }
}
