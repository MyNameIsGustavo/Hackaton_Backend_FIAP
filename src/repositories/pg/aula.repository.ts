import { prisma } from "../../prismaClient";
import { IAulaRepository } from "../aula.repository.interface";
import { IAula, IAulaComRelacoes } from "../../entities/interfaces/IAula";

export class AulaRepository implements IAulaRepository {

    async deletarAula(id: number): Promise<IAula | null> {
        try {
            const aulaSelecionada = await prisma.aula.findUnique({ where: { id: id } });

            if (!aulaSelecionada) return null;
            const aulaDeletada = await prisma.aula.delete({ where: { id: id } })

            return aulaDeletada as IAula;
        } catch (error) {
            throw new Error(`Erro ao deletar aula: ${error}`);
        }
    }

    async buscarTodasAulas(filtro: { nomeAula?: string; pagina?: number; limite?: number; ordenaPor?: string; ordem?: "asc" | "desc"; }): Promise<IAulaComRelacoes[]> {
        try {
            const pagina = filtro.pagina ?? 1;
            const limite = filtro.limite ?? 10;

            return await prisma.aula.findMany({
                where: filtro.nomeAula
                    ? {
                        nome: {
                            contains: filtro.nomeAula,
                            mode: "insensitive"
                        }
                    }
                    : undefined,

                orderBy: {
                    [filtro.ordenaPor ?? "nome"]: filtro.ordem ?? "asc"
                },

                skip: (pagina - 1) * limite,
                take: limite,

                include: {
                    planoAula: true,
                    professores: true,
                    materia: true,
                    turma: true,
                }
            });


        } catch (error) {
            throw new Error(`Erro ao buscar todas aulas: ${error}`);
        }
    }

    async cadastrarAula(dados: IAula): Promise<IAula | null> {
        try {
            const aulaCadastrada = await prisma.aula.create({ data: dados });

            if (!aulaCadastrada) return null;

            return aulaCadastrada as IAula;
        } catch (error) {
            throw new Error(`Erro ao cadastrar aula: ${error}`);
        }
    }

    async buscarAulaPorID(id: number): Promise<IAula | null> {
        try {
            const aulaSelecionada = await prisma.aula.findUnique({ where: { id: id } });

            if (!aulaSelecionada) return null;

            return aulaSelecionada as IAula;
        } catch (error) {
            throw new Error(`Erro ao buscar aula por ID: ${error}`);
        }
    }

    async alterarAula(dados: IAula, id: number): Promise<IAula | null> {
        try {
            const aulaSelecionada = await prisma.aula.findUnique({ where: { id: id } });

            if (!aulaSelecionada) return null;

            const aulaAlterada = await prisma.aula.update({
                data: dados,
                where: { id: id }
            })

            return aulaAlterada as IAula;
        } catch (error) {
            throw new Error(`Erro ao buscar aula por ID: ${error}`);
        }
    }
}