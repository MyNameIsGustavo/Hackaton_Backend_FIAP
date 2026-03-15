import { Professor } from "../../entities/professor.entity";
import { IProfessorRepository } from "../professor.repository.interface";
import { prisma } from "../../prismaClient";
import { IProfessor } from "../../entities/interfaces/IProfessor";

export class ProfessorRepository implements IProfessorRepository {
    async buscarProfessorPorEmail(email: string): Promise<Professor | null> {
        try {
            const professorExistente = await prisma.professor.findUnique({ where: { email: email } });

            if (!professorExistente) throw new Error(`Professor com email ${email} não encontrado.`);

            return professorExistente as Professor;
        } catch (error) {
            throw new Error(`Erro ao buscar Professor por email: ${error}`);
        }
    }

    async cadastrarProfessor(dados: IProfessor): Promise<IProfessor | null> {
        try {
            const professorCadastrado = await prisma.professor.create({ data: dados });

            if (!professorCadastrado) return null;

            return professorCadastrado as IProfessor;
        } catch (error) {
            throw new Error(`Erro ao cadastrador professor: ${error}`);
        }
    }

    async buscarProfessorPorID(id: number): Promise<IProfessor | null> {
        try {
            const professorSelecionado = await prisma.professor.findUnique({ where: { id: id } });

            if (!professorSelecionado) return null;

            return professorSelecionado as IProfessor;
        } catch (error) {
            throw new Error(`Erro ao buscar professor por ID: ${error}`);
        }
    }
}