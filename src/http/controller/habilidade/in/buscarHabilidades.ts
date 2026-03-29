import { Request, Response } from 'express';
import { z } from 'zod';
import { fabricaBuscarHabilidades } from '../../../../useCases/habilidadeUseCases/fabrica/fabricaHabilidades';

export async function buscarHabilidades(req: Request, res: Response) {
    // Função auxiliar para ignorar com segurança valores vazios ou lixos de URL (como "undefined" ou "NaN")
    const tratarNumeroUrl = (val: unknown) => {
        if (val === undefined || val === null || val === '') return undefined;
        if (typeof val === 'string' && (val.trim() === '' || val === 'undefined' || val === 'null' || val === 'NaN')) return undefined;
        
        const num = Number(val);
        return isNaN(num) ? undefined : num;
    };

    // Schema de validação blindado
    const querySchema = z.object({
        busca: z.string().optional().transform(val => val?.trim() || undefined),
        materiaId: z.preprocess(tratarNumeroUrl, z.number().int().positive().optional()),
        materia: z.preprocess(tratarNumeroUrl, z.number().int().positive().optional()),
        anoEscolar: z.preprocess(tratarNumeroUrl, z.number().int().positive().optional()),
        ano: z.preprocess(tratarNumeroUrl, z.number().int().positive().optional()),
        pagina: z.coerce.number().int().positive().default(1),
        limite: z.coerce.number().int().positive().default(20)
    });

    try {
        const parsedQuery = querySchema.parse(req.query);

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

    } catch (error) {
        // Se a validação falhar, retorna um JSON estruturado em vez de travar o servidor com HTML
        return res.status(400).json({ 
            mensagem: "Parâmetros de filtro inválidos", 
            erros: error 
        });
    }
}