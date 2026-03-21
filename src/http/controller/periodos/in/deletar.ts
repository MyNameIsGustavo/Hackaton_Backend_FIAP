import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaDeletarPeriodos } from '../../../../useCases/periodoUseCases/fabrica/fabricaDeletar-periodo';

export async function deletar(request: Request, response: Response) {

    try {
        const deletarPeriodo = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaDeletarPeriodo = await fabricaDeletarPeriodos();

        const resultadoValidacaoSchema = deletarPeriodo.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaDeletarPeriodo.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção da periodo: ${error}`);
    }
}