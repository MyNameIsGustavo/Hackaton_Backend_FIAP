import { prisma } from "../../prismaClient";
import { AtividadeComplementar } from "../../entities/atividadeComplementar.entity";
import { IAtividadeComplementar } from "../../entities/interfaces/IAtividadeComplementar";
import { IAtividadeRepository } from "../atividade.repository.interface";

export class AtividadeRepository implements IAtividadeRepository {
    async salvarAtividade(dados: IAtividadeComplementar): Promise<AtividadeComplementar | null> {
        try {
            const planoAula = await prisma.planoAula.findUnique({
                where: { aulaId: dados.aulaId }
            });

            if (!planoAula) {
                throw new Error(`Plano de aula não encontrado para a aula ${dados.aulaId}`);
            }

            const criada = await prisma.atividadeComplementar.create({
                data: {
                    planoAulaId: planoAula.id,
                    titulo: dados.titulo,
                    descricao: dados.descricao,
                    tipo: dados.tipo,
                }
            });

            return new AtividadeComplementar(
                criada.id,
                criada.planoAulaId,
                criada.titulo,
                criada.descricao,
                criada.tipo,
                criada.criadoEm
            );
        } catch (error) {
            throw new Error(`Erro ao salvar atividade: ${error}`);
        }
    }

    async buscarAtividadesPorPlanoAula(aulaId: number): Promise<AtividadeComplementar[]> {
        const planoAula = await prisma.planoAula.findUnique({
            where: { aulaId }
        });

        if (!planoAula) return [];

        const atividades = await prisma.atividadeComplementar.findMany({
            where: { planoAulaId: planoAula.id },
            orderBy: { criadoEm: 'desc' }
        });

        return atividades.map(a => new AtividadeComplementar(
            a.id,
            a.planoAulaId,
            a.titulo,
            a.descricao,
            a.tipo,
            a.criadoEm
        ));
    }
}
