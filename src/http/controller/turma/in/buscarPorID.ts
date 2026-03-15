import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaBuscarTurmaPorID } from '../../../../useCases/turmaUseCases/fabrica/fabricaBuscarPorID-turma';

export async function buscarPorID(request: Request, response: Response) {
    try {
        const buscarTurmaPorID = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaBuscarTurmaPorID = await fabricaBuscarTurmaPorID();

        const resultadoValidacaoSchema = buscarTurmaPorID.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({ mensagem: 'ID deve ser número inteiro positivo', erros: resultadoValidacaoSchema.error, });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaBuscarTurmaPorID.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID da turma: ${error}`);
    }
}