import { Aula } from "./aulas.entity";
import { Avaliacao } from "./avaliacao.entity";
import { UnidadeTematica } from "./unidadeTematica.entity";
import { Periodo } from "./periodo.entity";

export class Materia {
    id: number;
    nome: string;
    areaConhecimento: string;
    dataCadastro: Date;
    isAtivo: boolean;

    periodoId: number;
    periodo?: Periodo;

    aulas: Aula[];
    avaliacaos: Avaliacao[];
    unidadeTematicas: UnidadeTematica[];

    constructor(
        id: number,
        nome: string,
        areaConhecimento: string,
        dataCadastro: Date,
        isAtivo: boolean,
        periodoId: number,
        aulas: Aula[] = [],
        avaliacaos: Avaliacao[] = [],
        unidadeTematicas: UnidadeTematica[] = [],
        periodo?: Periodo
    ) {
        this.id = id;
        this.nome = nome;
        this.areaConhecimento = areaConhecimento;
        this.dataCadastro = dataCadastro;
        this.isAtivo = isAtivo;
        this.periodoId = periodoId;
        this.aulas = aulas;
        this.avaliacaos = avaliacaos;
        this.unidadeTematicas = unidadeTematicas;
        this.periodo = periodo;
    }
}