import { prisma } from "../../prismaClient";
import { IPlanoAulaRepository } from "../planoAula.repository.interface";
import { PlanoAula } from "../../entities/planoAula.entity";

export class PlanoAulaRepository implements IPlanoAulaRepository {
    async validarProfessorNaAula(professorId: number, aulaId: number): Promise<void> {
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

    async buscarPlanoPorAulaEProfessor(aulaId: number, professorId: number): Promise<PlanoAula | null> {
        await this.validarProfessorNaAula(professorId, aulaId);

        const plano = await prisma.planoAula.findFirst({
            where: {
                aulaId,
                professorId
            }
        });

        return plano as unknown as PlanoAula | null;
    }

    async cadastrarPlano(dados: any): Promise<PlanoAula | null> {
        try {
            await this.validarProfessorNaAula(dados.professorId, dados.aulaId);

            const habilidadeExistente = await prisma.habilidadeBNCC.findFirst({
                where: { codigo: dados.codigoHabilidade }
            });

            if (!habilidadeExistente) {
                throw new Error(`Habilidade BNCC ${dados.codigoHabilidade} não encontrada.`);
            }

            const planoCriado = await prisma.planoAula.upsert({
                where: {
                    aulaId_professorId: {
                        aulaId: dados.aulaId,
                        professorId: dados.professorId
                    }
                },
                update: {
                    objetivo: dados.objetivo,
                    metodologia: dados.metodologia,
                    recursosDidaticos: dados.recursosDidaticos,
                    avaliacao: dados.avaliacao,
                    habilidadeBNCCId: habilidadeExistente.id
                },
                create: {
                    aulaId: dados.aulaId,
                    professorId: dados.professorId,
                    habilidadeBNCCId: habilidadeExistente.id,
                    objetivo: dados.objetivo,
                    metodologia: dados.metodologia,
                    recursosDidaticos: dados.recursosDidaticos,
                    avaliacao: dados.avaliacao,
                    dataCadastro: new Date()
                }
            });

            return planoCriado as unknown as PlanoAula;
        } catch (error) {
            throw new Error(`Erro ao salvar Plano de Aula no banco: ${error}`);
        }
    }

    async buscarPlanosPorProfessor(
        professorId: number, 
        pagina: number, 
        limite: number, 
        termoBusca?: string
    ) {
        const skip = (pagina - 1) * limite;

        const whereClause: any = {
            professorId
        };

        // Adiciona busca por termo no objetivo ou metodologia
        if (termoBusca) {
            whereClause.OR = [
                { objetivo: { contains: termoBusca, mode: 'insensitive' } },
                { metodologia: { contains: termoBusca, mode: 'insensitive' } }
            ];
        }

        const [planos, total] = await Promise.all([
            prisma.planoAula.findMany({
                where: whereClause,
                skip,
                take: limite,
                orderBy: { dataCadastro: 'desc' },
                include: {
                    aula: true,
                    habilidadeBNCC: true
                }
            }),
            prisma.planoAula.count({ where: whereClause })
        ]);

        return { 
            planos: planos as unknown as PlanoAula[], 
            total 
        };
    }
}
