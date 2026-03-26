import { prisma } from "../../prismaClient";

export class ChatRepository {
    async buscarOuCriarConversa(aulaId: number) {
        // Tenta encontrar uma conversa existente para a aula
        let conversa = await prisma.conversaAgente.findUnique({
            where: { aulaId: aulaId }
        });

        // Se não existir, cria uma nova
        if (!conversa) {
            conversa = await prisma.conversaAgente.create({
                data: { aulaId: aulaId }
            });
        }
        return conversa;
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
}