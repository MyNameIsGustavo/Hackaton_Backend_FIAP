import { prisma } from "../../prismaClient";
import { AtividadeComplementar } from "../../entities/atividadeComplementar.entity";
import { IAtividadeComplementar } from "../../entities/interfaces/IAtividadeComplementar";
import { IAtividadeRepository } from "../atividade.repository.interface";

export class AtividadeRepository implements IAtividadeRepository {
    private async validarProfessorNaAula(aulaId: number, professorId: number) {
        const aula = await prisma.aula.findFirst({
            where: {
                id: aulaId,
                professores: {
                    some: { id: professorId }
                }
            },
            select: { id: true }
        });

        if (!aula) {
            throw new Error("Professor não tem acesso a esta aula.");
        }
    }

    private async buscarPlanoDaAulaPorProfessor(aulaId: number, professorId: number) {
        await this.validarProfessorNaAula(aulaId, professorId);

        const planoAula = await prisma.planoAula.findFirst({
            where: {
                aulaId,
                professorId
            }
        });

        return planoAula;
    }

    async salvarAtividade(dados: IAtividadeComplementar): Promise<AtividadeComplementar | null> {
        try {
            if (!dados.professorId) {
                throw new Error("Professor é obrigatório para salvar atividade.");
            }

            const planoAula = await this.buscarPlanoDaAulaPorProfessor(dados.aulaId, dados.professorId);

            if (!planoAula) {
                throw new Error(`Plano de aula não encontrado para a aula ${dados.aulaId} e professor ${dados.professorId}`);
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

    async buscarAtividadesPorPlanoAula(aulaId: number, professorId: number): Promise<AtividadeComplementar[]> {
        const planoAula = await this.buscarPlanoDaAulaPorProfessor(aulaId, professorId);

        if (!planoAula) {
            return [];
        }

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
