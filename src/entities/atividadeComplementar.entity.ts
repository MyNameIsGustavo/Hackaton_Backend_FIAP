export class AtividadeComplementar {
    id: number;
    planoAulaId: number;
    titulo: string;
    descricao: string;
    tipo: string;
    criadoEm: Date;

    constructor(
        id: number,
        planoAulaId: number,
        titulo: string,
        descricao: string,
        tipo: string,
        criadoEm: Date
    ) {
        this.id = id;
        this.planoAulaId = planoAulaId;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipo = tipo;
        this.criadoEm = criadoEm;
    }
}
