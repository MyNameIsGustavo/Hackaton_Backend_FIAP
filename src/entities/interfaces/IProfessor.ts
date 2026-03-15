export interface IProfessor {
    id?: number;
    nomeCompleto: string;
    email: string;
    senha: string;
    telefone: string;
    idade: number;
    formacao: string;
    especialidade: string;
    dataCadastro: Date;
    isAtivo: boolean;
}