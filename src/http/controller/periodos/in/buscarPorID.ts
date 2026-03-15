import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarPeriodoPorID } from '../../../../useCases/periodoUseCases/fabrica/fabricaBuscarPorID-periodo';

export async function buscarPorID(request: Request, response: Response) {
    try {
        const buscarPeriodoPorID = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaBuscarPeriodoPorID = await fabricaBuscarPeriodoPorID();

        const resultadoValidacaoSchema = buscarPeriodoPorID.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({ mensagem: 'ID deve ser número inteiro positivo', erros: resultadoValidacaoSchema.error, });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaBuscarPeriodoPorID.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID do professor: ${error}`);
    }
}