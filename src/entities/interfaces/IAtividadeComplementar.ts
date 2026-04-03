export interface IAtividadeComplementar {
    id?: number;
    aulaId: number;
    professorId?: number;
    titulo: string;
    descricao: string; // JSON stringificado com instrucoes + exercicios da IA
    tipo: string;      // tema passado na requisição
    criadoEm?: Date;
}
