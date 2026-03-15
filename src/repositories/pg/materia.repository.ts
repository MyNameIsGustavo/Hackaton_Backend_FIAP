import { prisma } from "../../prismaClient";
import { IMateria } from "../../entities/interfaces/IMateria";
import { IMateriaRepository } from "../materia.repository.interface";

export class MateriaRepository implements IMateriaRepository {

    async buscarTodasMaterias(): Promise<IMateria[] | []> {
        try {
            const materiasExistentes = await prisma.materia.findMany();

            if (!materiasExistentes) return [];

            return materiasExistentes as IMateria[];
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