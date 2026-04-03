import { Request, Response } from 'express';
import { z } from 'zod';
import { ChatRepository } from '../../../../repositories/pg/chat.repository';
import { ConversarUseCase } from '../../../../useCases/chronosUseCases/conversar';

export async function conversar(request: Request, response: Response) {
    try {
        const schema = z.object({
            aulaId: z.number().int().positive(),
            mensagem: z.string().min(1),
            conversaId: z.number().int().positive().optional()
        });

        const { aulaId, mensagem, conversaId } = schema.parse(request.body);
        const professorId = (request as any).usuario.id;

        const useCase = new ConversarUseCase(new ChatRepository());
        const resultado = await useCase.processar(aulaId, professorId, mensagem, conversaId);

        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(400).json({ erro: String(error) });
    }
}
