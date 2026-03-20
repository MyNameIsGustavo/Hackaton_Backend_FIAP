import { prisma } from "../../prismaClient";
import { IPeriodoRepository } from "../periodo.repository.interface";
import { IPeriodo, IPeriodoComRelacoes } from "../../entities/interfaces/IPeriodo";

export class PeriodoRepository implements IPeriodoRepository {

    async buscarTodosPeriodos(filtro: { nomePeriodo?: string; pagina?: number; limite?: number; ordenaPor?: string; ordem?: "asc" | "desc"; }): Promise<IPeriodoComRelacoes[]> {
        try {
            const page = filtro.pagina ?? 1;
            const limit = filtro.limite ?? 10;

            return await prisma.periodo.findMany({
                where: filtro.nomePeriodo
                    ? {
                        nome: {
                            contains: filtro.nomePeriodo,
                            mode: "insensitive"
                        }
                    }
                    : undefined,

                orderBy: {
                    [filtro.ordenaPor ?? "nome"]: filtro.ordem ?? "asc"
                },

                skip: (page - 1) * limit,
                take: limit,

                include: {
                    turmas: {
                        where: { isAtivo: true }
                    },
                    materias: {
                        where: { isAtivo: true }
                    }
                }
            });
        } catch (error) {
            throw new Error(`Erro ao buscar períodos: ${error}`);
        }
    }

    async cadastrarPeriodo(dados: IPeriodo): Promise<IPeriodo | null> {
        try {
            const periodoCadastrado = await prisma.periodo.create({ data: dados });

            if (!periodoCadastrado) return null;

            return periodoCadastrado as IPeriodo;
        } catch (error) {
            throw new Error(`Erro ao cadastrar periodo: ${error}`);
        }
    }

    async buscarPeriodoPorID(id: number): Promise<IPeriodo | null> {
        try {
            const periodoSelecionado = await prisma.periodo.findUnique({ where: { id: id } });

            if (!periodoSelecionado) return null;

            return periodoSelecionado as IPeriodo;
        } catch (error) {
            throw new Error(`Erro ao buscar periodo por ID: ${error}`);
        }
    }

    async alterarPeriodo(dados: IPeriodo, id: number): Promise<IPeriodo | null> {
        try {
            const periodoSelecionado = await prisma.periodo.findUnique({ where: { id: id } });

            if (!periodoSelecionado) return null;

            const periodoAlterado = await prisma.periodo.update({
                data: dados,
                where: { id: id }
            })

            return periodoAlterado as IPeriodo;
        } catch (error) {
            throw new Error(`Erro ao buscar periodo por ID: ${error}`);
        }
    }
}