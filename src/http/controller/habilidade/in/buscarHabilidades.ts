// buscarHabilidades.ts
import { Request, Response } from 'express';
import { z } from 'zod';
import { fabricaBuscarHabilidades } from '../../../../useCases/habilidadeUseCases/fabrica/fabricaHabilidades';

export async function buscarHabilidades(req: Request, res: Response) {
    const query = z.object({
        busca: z.string().optional(),
        materiaId: z.coerce.number().optional(),
        anoEscolar: z.coerce.number().optional(),
        pagina: z.coerce.number().default(1),
        limite: z.coerce.number().default(20)
    }).parse(req.query);

    const useCase = await fabricaBuscarHabilidades();
    const result = await useCase.processar(query);
    return res.status(200).json(result);
}