import { ObjetoConhecimento } from "./objetoConhecimento.entity";
import { CompetenciaBNCC } from "./competenciaBNCC.entity";
import { PlanoAula } from "./planoAula.entity";
import { Avaliacao } from "./avaliacao.entity";

export class HabilidadeBNCC {
    id: number;
    codigo: string;
    descricao: string;
    anoEscolar: number;

    objetoConhecimentoId: number;
    objetoConhecimento?: ObjetoConhecimento;

    competencias: CompetenciaBNCC[];

    planosAula: PlanoAula[];

    avaliacaoId?: number | null;
    avaliacao?: Avaliacao | null;

    constructor(
        id: number,
        codigo: string,
        descricao: string,
        anoEscolar: number,
        objetoConhecimentoId: number,
        competencias: CompetenciaBNCC[] = [],
        objetoConhecimento?: ObjetoConhecimento,
        planosAula: PlanoAula[] = [],
        avaliacaoId?: number | null,
        avaliacao?: Avaliacao | null
    ) {
        this.id = id;
        this.codigo = codigo;
        this.descricao = descricao;
        this.anoEscolar = anoEscolar;
        this.objetoConhecimentoId = objetoConhecimentoId;
        this.competencias = competencias;
        this.objetoConhecimento = objetoConhecimento;
        this.planosAula = planosAula;
        this.avaliacaoId = avaliacaoId;
        this.avaliacao = avaliacao;
    }
}
