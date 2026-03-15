import { Aula } from "./aulas.entity";
import { Periodo } from "./periodo.entity";
import { Avaliacao } from "./avaliacao.entity";

export class Turma {
    id: number;
    nome: string;
    anoEscolar: number;
    anoLetivo: number;
    isAtivo: boolean;

    aulas: Aula[];

    periodoId: number;
    periodo?: Periodo;

    avaliacaos: Avaliacao[];

    constructor(
        id: number,
        nome: string,
        anoEscolar: number,
        anoLetivo: number,
        isAtivo: boolean,
        periodoId: number,
        aulas: Aula[] = [],
        periodo?: Periodo,
        avaliacaos: Avaliacao[] = []
    ) {
        this.id = id;
        this.nome = nome;
        this.anoEscolar = anoEscolar;
        this.anoLetivo = anoLetivo;
        this.isAtivo = isAtivo;
        this.periodoId = periodoId;
        this.aulas = aulas;
        this.periodo = periodo;
        this.avaliacaos = avaliacaos;
    }
}