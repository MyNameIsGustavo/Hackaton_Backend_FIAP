import { HabilidadeBNCC } from "./habilidadeBNCC.entity";

export class CompetenciaBNCC {
    id: number;
    codigo: string;
    descricao: string;

    habilidadeBNCCId?: number | null;
    habilidadeBNCC?: HabilidadeBNCC | null;

    constructor(
        id: number,
        codigo: string,
        descricao: string,
        habilidadeBNCCId?: number | null,
        habilidadeBNCC?: HabilidadeBNCC | null
    ) {
        this.id = id;
        this.codigo = codigo;
        this.descricao = descricao;
        this.habilidadeBNCCId = habilidadeBNCCId;
        this.habilidadeBNCC = habilidadeBNCC;
    }
}