import { Request, Response } from 'express';
import { z } from 'zod';
import { fabricaBuscarHabilidades } from '../../../../useCases/habilidadeUseCases/fabrica/fabricaHabilidades';

export async function buscarHabilidades(req: Request, res: Response) {
    const querySchema = z.object({
        busca: z.string().optional().transform(val => val?.trim() || undefined),
        // Aceitamos tanto o nome do DB quanto o nome do Swagger, e ignoramos strings vazias
        materiaId: z.preprocess((val) => val ? Number(val) : undefined, z.number().optional()),
        materia: z.preprocess((val) => val ? Number(val) : undefined, z.number().optional()),
        anoEscolar: z.preprocess((val) => val ? Number(val) : undefined, z.number().optional()),
        ano: z.preprocess((val) => val ? Number(val) : undefined, z.number().optional()),
        pagina: z.coerce.number().default(1),
        limite: z.coerce.number().default(20)
    });

    const parsedQuery = querySchema.parse(req.query);

    // Mapeia para o objeto esperado pelo Repository
    const parametros = {
        busca: parsedQuery.busca,
        materiaId: parsedQuery.materiaId ?? parsedQuery.materia,
        anoEscolar: parsedQuery.anoEscolar ?? parsedQuery.ano,
        pagina: parsedQuery.pagina,
        limite: parsedQuery.limite
    };

    const useCase = await fabricaBuscarHabilidades();
    const result = await useCase.processar(parametros);
    return res.status(200).json(result);
}