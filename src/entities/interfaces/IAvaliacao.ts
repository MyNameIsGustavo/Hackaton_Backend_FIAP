export interface IAvaliacao {
    id: number;
    nome: string;
    dataAvaliacao: Date;
    tipo: string;
    isAtivo: boolean;

    turmaId: number;
    materiaId: number;
}