import { Request, Response } from 'express';
import { z } from 'zod';
import { fabricaBuscarHistoricoChronos } from '../../../../useCases/chronosUseCases/fabrica/fabricaBuscarHistorico-chronos';

export async function buscarHistorico(request: Request, response: Response) {
    try {
        const schema = z.object({
            aulaId: z.coerce.number().int().positive()
        });

        const { aulaId } = schema.parse(request.params);

        const useCase = await fabricaBuscarHistoricoChronos();
        const resultado = await useCase.processar(aulaId);

        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(400).json({ 
            mensagem: "Erro ao buscar histórico", 
            erro: String(error) 
        });
    }
}