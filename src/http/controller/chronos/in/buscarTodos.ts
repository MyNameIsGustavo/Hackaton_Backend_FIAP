import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarPlanosChronos } from '../../../../useCases/chronosUseCases/fabrica/fabricaBuscarPlanos-chronos';

export async function buscarTodos(request: Request, response: Response) {
    try {
        const querySchema = z.object({
            pagina: z.coerce.number().int().positive().default(1),
            limite: z.coerce.number().int().positive().default(10),
            busca: z.string().optional()
        });

        const { pagina, limite, busca } = querySchema.parse(request.query);
        const professorId = (request as any).usuario.id;

        const useCase = await fabricaBuscarPlanosChronos();
        const resultado = await useCase.processar(professorId, pagina, limite, busca);

        return response.status(200).json(resultado);
    } catch (error) {
        return response.status(400).json({ mensagem: "Erro na listagem", erro: String(error) });
    }
}