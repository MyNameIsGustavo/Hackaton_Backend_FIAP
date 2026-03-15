import { prisma } from "../../prismaClient";
import { IAulaRepository } from "../aula.repository.interface";
import { IAula } from "../../entities/interfaces/IAula";

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

    async buscarTodasAulas(): Promise<IAula[] | []> {
        try {
            const aulasExistentes = await prisma.aula.findMany();

            if (!aulasExistentes) return [];

            return aulasExistentes as IAula[];
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