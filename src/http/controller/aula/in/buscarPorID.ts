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
        const professorId = (request as any).usuario.id;

        const resultadoProcessado = await objFabricaBuscarAulaPorID.processar(id, professorId);

        if (!resultadoProcessado) {
            return response.status(404).json({ mensagem: 'Aula não encontrada' });
        }

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a buscar por ID da aula: ${error}`);
    }
}
