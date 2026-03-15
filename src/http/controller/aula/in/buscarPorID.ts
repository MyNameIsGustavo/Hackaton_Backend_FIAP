import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarAulaPorID } from '../../../../useCases/aulaUseCases/fabrica/fabricaBuscarPorID-aula';

export async function buscarPorID(request: Request, response: Response) {
    try {
        const buscarAulaPorID = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaBuscarAulaPorID = await fabricaBuscarAulaPorID();

        const resultadoValidacaoSchema = buscarAulaPorID.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({ mensagem: 'ID deve ser número inteiro positivo', erros: resultadoValidacaoSchema.error, });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaBuscarAulaPorID.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID da aula: ${error}`);
    }
}