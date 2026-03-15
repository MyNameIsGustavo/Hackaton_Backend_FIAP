import { prisma } from "../../prismaClient";
import { ITurma } from "../../entities/interfaces/ITurma";
import { ITurmaRepository } from "../turma.repository.interface";

export class TurmaRepository implements ITurmaRepository {

    async buscarTodasTurmas(): Promise<ITurma[] | []> {
        try {
            const turmasExistentes = await prisma.turma.findMany();

            if (!turmasExistentes) return [];

            return turmasExistentes as ITurma[];
        } catch (error) {
            throw new Error(`Erro ao buscar todas turmas: ${error}`);
        }
    }

    async cadastrarTurma(dados: ITurma): Promise<ITurma | null> {
        try {
            const turmaCadastrada = await prisma.turma.create({ data: dados });

            if (!turmaCadastrada) return null;

            return turmaCadastrada as ITurma;
        } catch (error) {
            throw new Error(`Erro ao cadastrar turma: ${error}`);
        }
    }

    async buscarTurmaPorID(id: number): Promise<ITurma | null> {
        try {
            const turmaSelecionada = await prisma.turma.findUnique({ where: { id: id } });

            if (!turmaSelecionada) return null;

            return turmaSelecionada as ITurma;
        } catch (error) {
            throw new Error(`Erro ao buscar turma por ID: ${error}`);
        }
    }

    async alterarTurma(dados: ITurma, id: number): Promise<ITurma | null> {
        try {
            const turmaSelecionada = await prisma.turma.findUnique({ where: { id: id } });

            if (!turmaSelecionada) return null;

            const turmaAlterada = await prisma.turma.update({
                data: dados,
                where: { id: id }
            })

            return turmaAlterada as ITurma;
        } catch (error) {
            throw new Error(`Erro ao buscar turma por ID: ${error}`);
        }
    }
}