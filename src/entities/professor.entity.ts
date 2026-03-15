import { Aula } from "./aulas.entity";

export class Professor {
    id: number;
    nomeCompleto: string;
    email: string;
    senha: string;
    telefone: string;
    idade: number;
    formacao: string;
    especialidade: string;
    dataCadastro: Date;
    isAtivo: boolean;
    aulas: Aula[];

    constructor(
        id: number,
        nomeCompleto: string,
        email: string,
        senha: string,
        telefone: string,
        idade: number,
        formacao: string,
        especialidade: string,
        dataCadastro: Date,
        isAtivo: boolean,
        aulas: Aula[] = []
    ) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.idade = idade;
        this.formacao = formacao;
        this.especialidade = especialidade;
        this.dataCadastro = dataCadastro;
        this.isAtivo = isAtivo;
        this.aulas = aulas;
    }
}