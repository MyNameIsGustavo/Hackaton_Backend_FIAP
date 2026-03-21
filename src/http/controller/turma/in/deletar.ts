import { z } from 'zod';
import type { Request, Response } from 'express';
import { fabricaDeletarTurmas } from '../../../../useCases/turmaUseCases/fabrica/fabricaDeletar-turma';

export async function deletar(request: Request, response: Response) {

    try {
        const deletarTurma = z.object({ id: z.coerce.number().int().positive() });

        const objFabricaDeletarTurma = await fabricaDeletarTurmas();

        const resultadoValidacaoSchema = deletarTurma.safeParse(request.params);
        if (!resultadoValidacaoSchema.success) {
            return response.status(400).json({
                mensagem: 'ID deve ser número inteiro positivo',
                erros: resultadoValidacaoSchema.error,
            });
        }

        const { id } = resultadoValidacaoSchema.data;

        const resultadoProcessado = await objFabricaDeletarTurma.processar(id);

        return response.status(201).json(resultadoProcessado);
    } catch (error) {
        throw new Error(`Erro ao processar a deleção da turma: ${error}`);
    }
}