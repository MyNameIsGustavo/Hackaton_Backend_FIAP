import { prisma } from "../../prismaClient";
import { IPeriodoRepository } from "../periodo.repository.interface";
import { IPeriodo } from "../../entities/interfaces/IPeriodo";

export class PeriodoRepository implements IPeriodoRepository {

    async buscarTodosPeriodos(): Promise<IPeriodo[] | []> {
        try {
            const periodosExistente = await prisma.periodo.findMany();

            if (!periodosExistente) return [];

            return periodosExistente as IPeriodo[];
        } catch (error) {
            throw new Error(`Erro ao buscar Professor por email: ${error}`);
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