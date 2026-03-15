export interface IAula {
    id?: number;
    nome: string;
    objetivosAprendizagem: string;
    dataAula: Date;
    isAtivo: boolean;
    turmaId: number;
    materiaId?: number;
}