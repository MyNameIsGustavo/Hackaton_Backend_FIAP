import { UnidadeTematica } from "./unidadeTematica.entity";
import { HabilidadeBNCC } from "./habilidadeBNCC.entity";

export class ObjetoConhecimento {
    id: number;
    nome: string;
    descricao: string;

    unidadeTematicaId: number;
    unidadeTematica?: UnidadeTematica;

    habilidades: HabilidadeBNCC[];

    constructor(
        id: number,
        nome: string,
        descricao: string,
        unidadeTematicaId: number,
        habilidades: HabilidadeBNCC[] = [],
        unidadeTematica?: UnidadeTematica
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.unidadeTematicaId = unidadeTematicaId;
        this.habilidades = habilidades;
        this.unidadeTematica = unidadeTematica;
    }
}