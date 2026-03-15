import { Aula } from "./aulas.entity";
import { HabilidadeBNCC } from "./habilidadeBNCC.entity";

export class PlanoAula {
    id: number;

    aulaId: number;
    aula?: Aula;

    objetivo: string;
    metodologia: string;
    recursosDidaticos: string;
    avaliacao: string;
    dataCadastro: Date;

    habilidadesBNCC: HabilidadeBNCC[];

    constructor(
        id: number,
        aulaId: number,
        objetivo: string,
        metodologia: string,
        recursosDidaticos: string,
        avaliacao: string,
        dataCadastro: Date,
        habilidadesBNCC: HabilidadeBNCC[] = [],
        aula?: Aula
    ) {
        this.id = id;
        this.aulaId = aulaId;
        this.objetivo = objetivo;
        this.metodologia = metodologia;
        this.recursosDidaticos = recursosDidaticos;
        this.avaliacao = avaliacao;
        this.dataCadastro = dataCadastro;
        this.habilidadesBNCC = habilidadesBNCC;
        this.aula = aula;
    }
}