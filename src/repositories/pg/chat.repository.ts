import { prisma } from "../../prismaClient";

export class ChatRepository {
    private async validarProfessorNaAula(professorId: number, aulaId: number) {
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

    async buscarConversaPorId(conversaId: number, professorId: number, aulaId?: number) {
        const conversa = await prisma.conversaAgente.findFirst({
            where: {
                id: conversaId,
                professorId,
                ...(aulaId ? { aulaId } : {})
            }
        });

        if (!conversa) {
            throw new Error("Conversa não encontrada para este professor.");
        }

        return conversa;
    }

    async criarConversa(aulaId: number, professorId: number) {
        await this.validarProfessorNaAula(professorId, aulaId);

        return await prisma.conversaAgente.create({
            data: {
                aulaId,
                professorId
            }
        });
    }

    async buscarOuCriarConversa(aulaId: number, professorId: number, conversaId?: number) {
        if (conversaId) {
            await this.validarProfessorNaAula(professorId, aulaId);
            return await this.buscarConversaPorId(conversaId, professorId, aulaId);
        }

        return await this.criarConversa(aulaId, professorId);
    }

    async buscarUltimaConversaPorProfessorEAula(aulaId: number, professorId: number) {
        await this.validarProfessorNaAula(professorId, aulaId);

        return await prisma.conversaAgente.findFirst({
            where: {
                aulaId,
                professorId
            },
            orderBy: {
                criadoEm: "desc"
            }
        });
    }

    async salvarMensagem(conversaId: number, role: 'user' | 'assistant', conteudo: string) {
        return await prisma.mensagemAgente.create({
            data: {
                conversaId,
                role,
                conteudo
            }
        });
    }

    async buscarHistorico(conversaId: number) {
        return await prisma.mensagemAgente.findMany({
            where: { conversaId },
            orderBy: { criadoEm: 'asc' },
            select: { role: true, conteudo: true }
        });
    }

    async buscarTodasConversasPorProfessor(professorId: number) {
        return await prisma.conversaAgente.findMany({
            where: {
                professorId
            },
            include: {
                aula: {
                    select: { 
                        nome: true, 
                        turma: { select: { nome: true } } 
                    }
                },
                mensagens: {
                    orderBy: { criadoEm: 'asc' }
                }
            },
            orderBy: { criadoEm: 'desc' }
        });
    }
}
