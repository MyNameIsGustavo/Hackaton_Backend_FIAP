import { prisma } from "../../prismaClient";
import { IMateria, IMateriaComRelacoes } from "../../entities/interfaces/IMateria";
import { IMateriaRepository } from "../materia.repository.interface";

export class MateriaRepository implements IMateriaRepository {

    async buscarTodasMaterias(filtro: { nomeMateria?: string; pagina?: number; limite?: number; ordenaPor?: string; ordem?: "asc" | "desc"; }): Promise<IMateriaComRelacoes[]> {
        try {
            const pagina = filtro.pagina ?? 1;
            const limite = filtro.limite ?? 10;

            return await prisma.materia.findMany({
                where: filtro.nomeMateria
                    ? {
                        nome: {
                            contains: filtro.nomeMateria,
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
                    aulas: true,
                    avaliacaos: true,
                    periodo: true,
                    unidadeTematicas: true
                }
            });
        } catch (error) {
            throw new Error(`Erro ao buscar todas materias: ${error}`);
        }
    }

    async cadastrarMateria(dados: IMateria): Promise<IMateria | null> {
        try {
            const materiaCadastrada = await prisma.materia.create({ data: dados });

            if (!materiaCadastrada) return null;

            return materiaCadastrada as IMateria;
        } catch (error) {
            throw new Error(`Erro ao cadastrar materia: ${error}`);
        }
    }

    async buscarMateriaPorID(id: number): Promise<IMateria | null> {
        try {
            const materiaSelecionada = await prisma.materia.findUnique({ where: { id: id } });

            if (!materiaSelecionada) return null;

            return materiaSelecionada as IMateria;
        } catch (error) {
            throw new Error(`Erro ao buscar materia por ID: ${error}`);
        }
    }

    async alterarMateria(dados: IMateria, id: number): Promise<IMateria | null> {
        try {
            const materiaSelecionada = await prisma.materia.findUnique({ where: { id: id } });

            if (!materiaSelecionada) return null;

            const materiaAlterada = await prisma.materia.update({
                data: dados,
                where: { id: id }
            })

            return materiaAlterada as IMateria;
        } catch (error) {
            throw new Error(`Erro ao buscar materia por ID: ${error}`);
        }
    }
}