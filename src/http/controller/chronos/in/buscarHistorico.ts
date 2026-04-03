import { Request, Response } from 'express';
import { z } from 'zod';
import { fabricaBuscarHistoricoChronos } from '../../../../useCases/chronosUseCases/fabrica/fabricaBuscarHistorico-chronos';

export async function buscarHistorico(request: Request, response: Response) {
    try {
        const schema = z.object({
            aulaId: z.coerce.number().int().positive()
        });
        const querySchema = z.object({
            conversaId: z.coerce.number().int().positive().optional()
        });

        const { aulaId } = schema.parse(request.params);
        const { conversaId } = querySchema.parse(request.query);
        const professorId = (request as any).usuario.id;

        const useCase = await fabricaBuscarHistoricoChronos();
        const resultado = await useCase.processar(aulaId, professorId, conversaId);

        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(400).json({ 
            mensagem: "Erro ao buscar histórico", 
            erro: String(error) 
        });
    }
}
