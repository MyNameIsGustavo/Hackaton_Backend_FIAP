import { prisma } from "../../prismaClient";
import { IAulaRepository } from "../aula.repository.interface";
import { IAula, IAulaComRelacoes } from "../../entities/interfaces/IAula";

export class AulaRepository implements IAulaRepository {
    private whereProfessorTemAcesso(id: number, professorId?: number) {
        if (!professorId) {
            return { id };
        }

        return {
            id,
            professores: {
                some: { id: professorId }
            }
        };
    }

    async deletarAula(id: number, professorId?: number): Promise<IAula | null> {
        try {
            const aulaSelecionada = await prisma.aula.findFirst({
                where: this.whereProfessorTemAcesso(id, professorId)
            });

            if (!aulaSelecionada) return null;
            const aulaDeletada = await prisma.aula.delete({ where: { id: id } })

            return aulaDeletada as IAula;
        } catch (error) {
            throw new Error(`Erro ao deletar aula: ${error}`);
        }
    }

    async buscarTodasAulas(
        filtro: { nomeAula?: string; pagina?: number; limite?: number; ordenaPor?: string; ordem?: "asc" | "desc"; },
        professorId?: number
    ): Promise<IAulaComRelacoes[]> {
        try {
            const pagina = filtro.pagina ?? 1;
            const limite = filtro.limite ?? 10;
            const whereClause: any = {};

            if (filtro.nomeAula) {
                whereClause.nome = {
                    contains: filtro.nomeAula,
                    mode: "insensitive"
                };
            }

            if (professorId) {
                whereClause.professores = {
                    some: { id: professorId }
                };
            }

            return await prisma.aula.findMany({
                where: whereClause,

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

    async cadastrarAula(dados: IAula, professorId?: number): Promise<IAula | null> {
        try {
            const data: any = { ...dados };

            if (professorId) {
                data.professores = {
                    connect: { id: professorId }
                };
            }

            const aulaCadastrada = await prisma.aula.create({ data });

            if (!aulaCadastrada) return null;

            return aulaCadastrada as IAula;
        } catch (error) {
            throw new Error(`Erro ao cadastrar aula: ${error}`);
        }
    }

    async buscarAulaPorID(id: number, professorId?: number): Promise<IAula | null> {
        try {
            const aulaSelecionada = await prisma.aula.findFirst({
                where: this.whereProfessorTemAcesso(id, professorId)
            });

            if (!aulaSelecionada) return null;

            return aulaSelecionada as IAula;
        } catch (error) {
            throw new Error(`Erro ao buscar aula por ID: ${error}`);
        }
    }

    async alterarAula(dados: IAula, id: number, professorId?: number): Promise<IAula | null> {
        try {
            const aulaSelecionada = await prisma.aula.findFirst({
                where: this.whereProfessorTemAcesso(id, professorId)
            });

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
