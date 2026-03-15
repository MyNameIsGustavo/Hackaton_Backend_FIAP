import { IProfessor } from "../entities/interfaces/IProfessor";

export interface IProfessorRepository {
    cadastrarProfessor(dados: IProfessor): Promise<IProfessor | null>
    buscarProfessorPorEmail(email: string): Promise<IProfessor | null>
    buscarProfessorPorID(id: number): Promise<IProfessor | null>;
}